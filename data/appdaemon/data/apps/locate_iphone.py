import appdaemon.plugins.hass.hassapi as hass
import json
import calendar
import time

class iCloud(hass.Hass):
	""" App using PyiCloudService to request every X minutes an update of iDevice information

		Gather phone GPS position & battery status
		Send MQTT notification with updated values
	"""

	def initialize(self):
		self.log('********* iCloud init *********')

		self.log(" - account name: " + self.args["account_name"])
		#self.log(" - account pwd:  " + self.args["account_passwd"])

		run_every = 30
		if 'run_every' in self.args:
			run_every = self.args["run_every"]
			self.log(" - every " + str(run_every) + " minutes")

		self.run_every(self.update_location, self.datetime(), run_every * 60)

	def update_location(self, kwargs):
		from pyicloud import PyiCloudService
		from pyicloud.exceptions import (PyiCloudFailedLoginException, PyiCloudNoDevicesException, PyiCloudException)

		try:
			self.my_log("updating location for " + self.args["account_name"])

			api = PyiCloudService(self.args["account_name"], self.args["account_passwd"])

			if api.requires_2sa:
				self.my_log('requires_2sa is True for account ' + self.args["account_name"])

				api.authenticate()
				if api.requires_2sa:
					raise Exception('Unknown failure')

			try:
				if "iphone_id" in self.args:
					location = api.devices[self.args["iphone_id"]].location()
					status = api.devices[self.args["iphone_id"]].status()
				else:
					location = api.iphone.location()
					status = api.iphone.status()

				self.my_log(json.dumps(location))
				self.my_log(json.dumps(status))

				topic = "owntracks/iphone/" + self.args["name"]

				data = {}
				data['_type'] = "location"
				data['t'] = "c"	# c/u GPS, b BTLE
				data['tid'] = self.args["name"]
				data['lon'] = location["longitude"]
				data['lat'] = location["latitude"]
				data['acc'] = int(location["horizontalAccuracy"])
				data['batt'] = int(status["batteryLevel"] * 100)
				data['_cp'] = True
				data['tst'] = calendar.timegm(time.gmtime())

				json_data = json.dumps(data, ensure_ascii=False)

				self.my_log(json_data)
				self.call_service("mqtt/publish", topic = topic, payload = json_data, qos = "1", retain = "false")

			except PyiCloudNoDevicesException:
				self.my_log("no devices found", True)
			except Exception as error:
				self.my_log("error (1): " + error, True)

		except PyiCloudFailedLoginException as error: 
			self.my_log("error in login: " + error, True)
		except PyiCloudException as error:
			self.my_log("error setting up 2FA: " + error, True)
		except Exception as error:
			self.my_log("error (2): " + str(error))

	def my_log(self, s, force=False):
		if "verbose_log" in self.args or force == True:
			self.log('===> ' + s)
