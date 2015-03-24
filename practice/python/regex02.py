import json
import requests
import re
import twitter
from urllib import urlopen
from pprint import pprint

CONSUMER_KEY = 'HPo5PkazsK86SVmlrsP1A'
CUSTOMER_SECRET = 'uamx9qJbkhqFvWMMh32QX8iRRJoKy5ErW9Ucn4JUM'
OAUTH_TOKEN = '16261478-lv0RtDNqnxDIuqVvd7qvswI5uPVuz6gJzBVDWks9p'
OAUTH_TOKEN_SECRET = '9ofYC967jZaP2c6yHqyWUwrom3psgMoPMA81oDT1UCLRd'

auth = twitter.oauth.OAuth(OAUTH_TOKEN, OAUTH_TOKEN_SECRET, CONSUMER_KEY, CUSTOMER_SECRET)
twitter_api = twitter.Twitter(auth=auth)	

def getStatuses(user):
	return twitter_api.statuses.user_timeline(screen_name = user)

json_data = open('../../../data/politics/test.json')
status_data = json.load(json_data)
# tweet_dict = {}

images = []

for item in status_data:
	user = item['social'][0]['twitter']
	statuses = getStatuses(user)
	for status in statuses:
		try:
			# pprint(status['entities']['media'][0]['type'])
			if(status['entities']['media'][0]['type']):
				images.append(status['entities']['media'][0]['media_url'])
				print 'panda'
		except KeyError, e:
			print 'error ' + str(e)
		# tweet = status['text']
		# pics = re.findall(r'\bhttp://t.com/\w+', tweet)
		# pprint(pics)

print images

json_file = open('images.json', 'w')
json_file.write(json.dumps(images, indent=4))
json_file.close()