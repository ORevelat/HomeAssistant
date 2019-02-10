import appdaemon.plugins.hass.hassapi as hass
from libs.sendsms import SendSMS

class SmsSend(hass.Hass):

	""" App that listen to a specific event SMS_SEND and send the specified message

	"""

	def initialize(self):
		self.log("********* SmsSend init *********")

		self.sms = SendSMS(self.__my_log)

		self.listen_event(self.send_sms, "SMS_SEND")

	def send_sms(self, event_name, data, kwargs):
		if event_name == "SMS_SEND" and "number" in data and "message" in data:
			self.__send_sms(data['number'], str(data['message']))

	def __send_sms(self, phone, message):
		self.sms.send_message(phone, message)

	def __my_log(self, s):
		if "verbose_log" in self.args:
			self.log('===> ' + s)
