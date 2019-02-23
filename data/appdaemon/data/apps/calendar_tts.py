import appdaemon.plugins.hass.hassapi as hass
import datetime
import json
import ast

class CalendarTTS(hass.Hass):
	""" Simple app that listen for a calendar state change in Hass to invoke TTS on the event content

	"""

	def initialize(self):
		self.log('********* CalendarTTS init *********')

		self.log(" - calendar used: " + self.args["name"])

		self.listen_state(self.__calendar_state, self.args["name"], old="off", new="on")

	def __calendar_state(self, event_name, attribute, old, new, kwargs):
		try:
			message = self.get_state(event_name, attribute='message')
			descr = self.get_state(event_name, attribute='description')

			message = ('', str(message))[message is not None]
			descr = ('', str(descr))[descr is not None]

			self.__log(message + ' - ' + descr)

			parsed_d = json.loads(str(descr))

			if 'say' in parsed_d:
				description = str(parsed_d['say'])
				if description != '':
					#self.fire_event("ALEXA_SAY", message = description)
					self.call_service("shell_command/alexa_say", device="echo", text=description)

			if 'dotti' in parsed_d:
				mode = str(parsed_d['dotti'])
				color = '[0,0,0]'
				if 'color' in parsed_d:
					color = str(parsed_d["color"])

				json_data = json.dumps({'mode': mode, 'color': color}, ensure_ascii=False)
				self.__mqtt_publish(json_data, self.args['dotti'])

				if 'delay' in parsed_d:
					delay = int(parsed_d["delay"])
					self.run_in(self.__reset_dotti, delay * 60)

		except ValueError:
			self.__log("decoding message failed !", True)
		except:
			self.__log("processing message failed !", True)

	def __reset_dotti(self, kwargs):
		json_data = json.dumps({'mode': 'hour'}, ensure_ascii=False)
		self.__mqtt_publish(json_data, self.args['dotti'])

	def __mqtt_publish(self, data, topic):
		self.call_service("mqtt/publish", topic = topic, payload = data, qos = "1", retain = "false")

	def __log(self, s, force=False):
		if "verbose_log" in self.args or force == True:
			self.log('===> ' + s)
