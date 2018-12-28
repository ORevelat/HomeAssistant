import subprocess

class SendSMS:

	def __init__(self, logFct):
		self.log = logFct

	def send_message(self, number, message):
		if len(number) == 0 or len(message) == 0:
			self.log("missing either number or message in attributes !")
			return

		command = 'gammu-smsd-inject TEXT ' + number + ' -text "' + message + '"'

		try:
			subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True, check=True)
			self.log('sms sent to ' + number + " - " + message)
		except subprocess.CalledProcessError as suberror:
			self.log("error: %s" % suberror.stdout.decode('utf-8'))
