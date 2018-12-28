import appdaemon.plugins.hass.hassapi as hass

import os
import shutil
import hashlib
from pathlib import Path
from libs.pylms.server import Server
from libs.pylms.player import Player
from pydub import AudioSegment
from datetime import datetime, timedelta

class FileCache:
	""" File cache class based on string value

		get a file on fs given the text message
		- if found on fs but aged more than 1 day return not found
		- else return full path of the file
		save a file to fs given the text message
	"""

	def __init__(self, base_url, config_dir):
		self.cache = os.path.join(config_dir, 'www/tts')
		self.base_url = base_url + '/local/tts/'

		if os.path.isdir(self.cache) == False:
			os.mkdir(self.cache)

	def get(self, message, language):
		msg_hash = hashlib.sha1(bytes(message + language, 'utf-8')).hexdigest()
		full_path = os.path.join(self.cache, (msg_hash + '.mp3').lower())

		my_file = Path(full_path)
		if not my_file.is_file():
			return None

		file_mod_time = datetime.fromtimestamp(os.stat(full_path).st_mtime)
		now = datetime.today()
		max_delay = timedelta(days=1)	# 1 day max
		if now-file_mod_time > max_delay:
			os.remove(full_path)
			return None

		return full_path
	
	def save(self, filename, message, language):
		msg_hash = hashlib.sha1(bytes(message + language, 'utf-8')).hexdigest()
		full_path = os.path.join(self.cache, (msg_hash + '.mp3').lower())

		try:
			shutil.move(filename, full_path)
			return full_path
		except:
			return None
	
	def get_url(self, message, language):
		msg_hash = hashlib.sha1(bytes(message+ language, 'utf-8')).hexdigest()

		return self.base_url + (msg_hash + '.mp3').lower()

class PicoTTS:
	""" Simple app that call pico2wave + ffmepg to generated a TTS mp3 given a text

	"""
	def __init__(self):
		pass

	def generate(self,  message="", language=""):
		import tempfile
		import subprocess

		with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmpf:
			fname = tmpf.name
		with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmpf:
			fname3 = tmpf.name

		cmd = ["pico2wave", "--wave", fname, "-l", language, message]
		subprocess.call(cmd)

		cmd = ["ffmpeg", "-loglevel", "panic", "-hide_banner", "-y", "-i", fname, fname3]
		subprocess.call(cmd)

		try:
			my_file = Path(fname3)
			if my_file.is_file():
				return fname3
			return None
		finally:
			os.remove(fname)

class SqueezePlayer:
	""" Squeezeplayer app allowing to correctly handle mp3 file playing

	"""

	def __init__(self, host, port, player):
		self.server = Server(hostname=host, port=port)
		self.server.connect()
		self.player = self.server.get_player(player)
	
	def play_start(self, filepath, fileurl):
		song = AudioSegment.from_mp3(filepath)

		self.modeinit = self.player.get_mode()
		self.powerinit = self.player.get_power_state()
		self.actualvolume = self.player.get_volume()
		self.actualshufflestate = self.player.get_playlist_shuffle_state()
		self.actualindex = self.player.get_playlist_index()
		self.tempplaylistname = 'temp_' + self.player.get_ref().replace(':','')
		self.player.set_playlist_shuffle_state(0)
		self.player.playlist_save(self.tempplaylistname)
		self.positionlecture = self.player.get_time_elapsed()
		self.player.playlist_play(fileurl)

		return int(song.duration_seconds + 2)

	def play_stop(self, phase = 0):
		if phase == 0:
			self.player.set_volume(0)
			self.player.playlist_play_playlist(self.tempplaylistname)
			return 1
		elif phase == 1:
			self.player.playlist_play_index(int(self.actualindex))
			return 1
		elif phase == 2:
			self.player.seek_to(self.positionlecture)
			return 0.05
		elif phase == 3:
			if self.powerinit == False:
				self.player.set_power_state(0)
				self.player.set_volume(self.actualvolume)
				self.player.set_playlist_shuffle_state(self.actualshufflestate)
				return -1
			else:
				if self.modeinit=='stop':
					self.player.stop()
					self.player.set_volume(self.actualvolume)
					self.player.set_playlist_shuffle_state(self.actualshufflestate)
					return -1
				elif self.modeinit=='pause':
					return 2
				else:
					self.player.set_volume(self.actualvolume)
					self.player.set_playlist_shuffle_state(self.actualshufflestate)
					return -1
		elif phase == 4:
			self.player.pause()
			return 0.5
		elif phase == 5:
			self.player.set_volume(self.actualvolume)
			self.player.set_playlist_shuffle_state(self.actualshufflestate)
			return -1

class Squeezebox(hass.Hass):
	""" App that listen to a specific event ALEXA_SAY and perform TTS on the provided text

		use picotts (+ filecache) + squeezeplayer
	"""

	def initialize(self):
		self.log("********* Squeezebox init *********")

		self._cache = FileCache(self.args["hass_url"], self.args["config_dir"])
		self._picotts = PicoTTS()

		self.listen_event(self.alexa_say, "ALEXA_SAY")

	def alexa_say(self, event_name, data, kwargs):
		if event_name == "ALEXA_SAY" and "message" in data:
			self.__say_start(data['message'])
		else:
			self.__log("alexa_say() called without right event_name or no message in data")

	def __say_start(self, message="", language="fr-FR"):
		self._player = SqueezePlayer(self.args["server"], self.args["port"], self.args["player"])

		filepath = self._cache.get(message, language)
		if filepath == None:
			tmp = self._picotts.generate(self.__format(message), language)
			filepath = self._cache.save(tmp, message, language)
			if filepath == None:
				self.__log('Error during file creation for tts rendering', True)
				return

		fileurl = self._cache.get_url(message, language)
		
		self._stop_step = 0

		self.__log('lang="' + language + '" text="' + message + '"')

		to_wait = self._player.play_start(filepath, fileurl)
		self.run_in(self.__say_stop, to_wait)

	def __say_stop(self, kwargs):
		delay = self._player.play_stop(self._stop_step)
		if delay == -1:
			return
		
		self._stop_step += 1
		self.run_in(self.__say_stop, delay)

	def __format(self, msg):
		return ' , , , , , , , , ' + msg

	def __log(self, s, force=False):
		if "verbose_log" in self.args:
			self.log('===> say: ' + s)
