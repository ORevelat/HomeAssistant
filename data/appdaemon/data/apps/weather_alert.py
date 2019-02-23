import appdaemon.plugins.hass.hassapi as hass
import requests
from bs4 import BeautifulSoup
from libs.sendsms import SendSMS
import shelve

class VigilanceMeteoFrance(hass.Hass):
	""" App that get every X minutes weather alert from Meteo France

		Send SMS on changes to defined phonenumber
		Save to file current state to avoid sending sms when app/hass restart if no changes
	"""

	def initialize(self):
		self.log('********* VigilanceMeteoFrance init *********')

		self.sms = SendSMS(self.__my_log)
		self.crue = 1
		self.vigilance = 1
		self.risques = "RAS"

		with shelve.open(self.args['db_file']) as db:
			if 'VigilanceMeteoFrance.weather_alert_crue' in db:
				self.crue = db['VigilanceMeteoFrance.weather_alert_crue']
			if 'VigilanceMeteoFrance.weather_alert_vigilance' in db:
				self.vigilance = db['VigilanceMeteoFrance.weather_alert_vigilance']
			if 'VigilanceMeteoFrance.weather_alert_risques' in db:
				self.risques = db['VigilanceMeteoFrance.weather_alert_risques']

		run_every = 30
		if 'run_every' in self.args:
			run_every = self.args["run_every"]
			self.log(" - every " + str(run_every) + " minutes")

			self.log("Phone numbers used")
		for phone in self.args["phone_numbers"]:
			self.log(" - " + str(phone))

		self.run_every(self.weather_retrieve, self.datetime(), run_every * 60)

	def weather_retrieve(self, kwargs):
		req1 = requests.get('http://vigilance.meteofrance.com/data/NXFR34_LFPW_.xml')
		req2 = requests.get('http://vigilance.meteofrance.com/data/NXFR33_LFPW_.xml')

		if req1.status_code != 200:
			self.log("API error code=" + req1.status_code)
			return
		if req2.status_code != 200:
			self.log("API error code=" + req2.status_code)
			return

		soup1 = BeautifulSoup(req1.text, features="html.parser")
		soup2 = BeautifulSoup(req2.text, features="html.parser")

		v = soup1.find("datavigilance", {"dep": self.args["departement"]})
		c = v.find("crue")
		r = v.find("risque")

		vigilance = v['couleur']
		crue = 1
		risquesarray = []
		if c != None:
			crue = c["valeur"]
		if r != None:
			for rr in r:
				risquesarray.append(self.__get_text_risk(rr["valeur"]))

		if len(risquesarray) > 0:
			risques = ', '.join(risquesarray)
		else:
			risques = "RAS"

		for v in soup2.find_all("dv", {"dep": self.args["departement"]}):
			couleur = v['coul']
			for r in v.find_all("risque"):
				if r["val"] == "1":
					if risques == "RAS":
						risques = "vent " + self.__get_color(couleur)
					else:
						risques += ", vent " + self.__get_color(couleur)
				if r["val"] == "2":
					if risques == "RAS":
						risques = "pluie-innondation " + self.__get_color(couleur)
					else:
						risques += ", pluie-innondation " + self.__get_color(couleur)
				if r["val"] == "3":
					if risques == "RAS":
						risques = "orages " + self.__get_color(couleur)
					else:
						risques += ", orages " + self.__get_color(couleur)
				if r["val"] == "4":
					if risques == "RAS":
						risques = "inondations " + self.__get_color(couleur)
					else:
						risques += ", inondations " + self.__get_color(couleur)
				if r["val"] == "5":
					if risques == "RAS":
						risques = "neige-verglas " + self.__get_color(couleur)
					else:
						risques += ", neige-verglas " + self.__get_color(couleur)
				if r["val"] == "6":
					if risques == "RAS":
						risques = "canicule " + self.__get_color(couleur)
					else:
						risques += ", canicule " + self.__get_color(couleur)
				if r["val"] == "7":
					if risques == "RAS":
						risques = "grand-froid " + self.__get_color(couleur)
					else:
						risques += ", grand-froid " + self.__get_color(couleur)
				if r["val"] == "8":
					if risques == "RAS":
						risques = "avalanches " + self.__get_color(couleur)
					else:
						risques += ", avalanches " + self.__get_color(couleur)
				if r["val"] == "9":
					if risques == "RAS":
						risques = "vagues-submersion " + self.__get_color(couleur)
					else:
						risques += ", vagues-submersion " + self.__get_color(couleur)

		crue = int(crue)
		vigilance = int(vigilance)

		#self.__my_log("crue " + str(crue) + " / vigilance " + str(vigilance) + " / risques " + risques)

		if crue != self.crue:
			self.crue = crue

			# terminée
			if crue == 1:
				self.__send_sms("La vigilance crue est terminée")
			elif crue == 3 or crue == 4:
				message = "Une vigilance " + self.__get_color(crue) + " crue est active."
				self.__send_sms(message)
				# notification sonore à ajouter
				self.__my_log(message)
				if crue == 4:
					#self.fire_event("ALEXA_SAY", message = message)
					self.call_service("shell_command/alexa_say", device="echo", text=message)

		if vigilance != self.vigilance or risques != self.risques:
			self.vigilance = vigilance
			self.risques = risques

			# terminée
			if vigilance == 1:
				self.__send_sms("La vigilance météo est terminée.")
			else:
				message = "Une vigilance " + self.__get_color(vigilance) + " est active. Risque(s) " + risques
				self.__send_sms(message)
				if vigilance == 3 or vigilance == 4:
					#notification sonores
					self.__my_log(message)
					if vigilance == 4:
						#self.fire_event("ALEXA_SAY", message = message)
						self.call_service("shell_command/alexa_say", device="echo", text=message)

		self.__update_sensor()
	
	def __send_sms(self, message):
		if not self.get_state(self.args["switch_activate"]) == "on":
			return

		for phone in self.args["phone_numbers"]:
			self.sms.send_message(phone, message)

	def __update_sensor(self):
		self.set_state("sensor.weather_alert_crue", state=self.__get_color(self.crue), attributes = {"hidden": "true"})
		self.set_state("sensor.weather_alert_vigilance", state=self.__get_color(self.vigilance), attributes = {"hidden": "true"})
		self.set_state("sensor.weather_alert_risques", state=self.risques, attributes = {"hidden": "true"})

		with shelve.open(self.args['db_file']) as db:
			db['VigilanceMeteoFrance.weather_alert_crue'] = self.crue
			db['VigilanceMeteoFrance.weather_alert_vigilance'] = self.vigilance
			db['VigilanceMeteoFrance.weather_alert_risques'] = self.risques

	def __my_log(self, s):
		if "verbose_log" in self.args:
			self.log('===> ' + s)

	def __get_color(self, arg):
		switcher = {
			1: "vert",
			2: "jaune",
			3: "orange",
			4: "rouge",
		}
		return switcher.get(int(arg), "Inconnu (" + str(arg) + ")")

	def __get_text_risk(self, arg):
		switcher = {
			1: "vent",
			2: "pluie-inondation",
			3: "orages",
			4: "inondations",
			5: "neige-verglas",
			6: "canicule",
			7: "grand-froid"
		}
		return switcher.get(int(arg), "Inconnu (" + str(arg) + ")")
