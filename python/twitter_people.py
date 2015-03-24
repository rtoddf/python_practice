import twitter
import json
from urllib import urlopen
from collections import Counter
from pprint import pprint

CONSUMER_KEY = 'HPo5PkazsK86SVmlrsP1A'
CUSTOMER_SECRET = 'uamx9qJbkhqFvWMMh32QX8iRRJoKy5ErW9Ucn4JUM'
OAUTH_TOKEN = '16261478-lv0RtDNqnxDIuqVvd7qvswI5uPVuz6gJzBVDWks9p'
OAUTH_TOKEN_SECRET = '9ofYC967jZaP2c6yHqyWUwrom3psgMoPMA81oDT1UCLRd'

auth = twitter.oauth.OAuth(OAUTH_TOKEN, OAUTH_TOKEN_SECRET, CONSUMER_KEY, CUSTOMER_SECRET)
twitter_api = twitter.Twitter(auth=auth)

group = 'actresses'
# groups = ['actors', 'actresses', artists, 'directors', 'hosts', 'misc', 'music',
# performers', 'politics', 'sports', 'writers', 'youtube']

## actresses, 

json_data = open('../../data/people/' + group + '.json')
status_data = json.load(json_data)
tweet_dict = {}

def getStatuses(user):
	return twitter_api.statuses.user_timeline(screen_name = user)

def getEntities(entities):
	t_urls = entities['urls']
	if(t_urls == []):
		urls = ''
	else:
		for t_url in t_urls:
			tweet_url = t_url['url']
			tweet_expanded_url = t_url['expanded_url']
		urls = {
			'tweet_url': tweet_url,
			'tweet_expanded_url': tweet_expanded_url
		}

	t_hashtags = entities['hashtags']
	if(t_hashtags == []):
		hashtags = ''
	else:
		hashtags = []
		for t_hash in t_hashtags:
			hashtags.append(t_hash['text'])
		# hashtags = hashes

	ents = {
		'urls': urls,
		'hashtags': hashtags
	}

	t_mentions = entities['user_mentions']
	if(t_mentions == []):
		mentions = ''
	else:
		mentions = []
		for t_mention in t_mentions:
			mentions.append(t_mention['screen_name'])

	ents = {
		'urls': urls,
		'hashtags': hashtags,
		'mentions': mentions
	}
	return ents

for item in status_data:
	if item['social'][0].get('twitter'):
		name = item['name']
		shortname = item['shortname']
		category = item['type']
		user = item['social'][0]['twitter']

		# get tweet data from twitter api
		search_results = getStatuses(user)
		# set up tweets data
		tweets = {}
		for j, status in enumerate(search_results):
			tweet = {}
			description = (status['user']['description']).encode('ascii','ignore')
			profile_image = status['user']['profile_image_url']
			if status['user'].get('profile_banner_url'):
				profile_banner = status['user']['profile_banner_url']
			else:
				profile_banner = ''
			followers = status['user']['followers_count']
			tweet_created = status['created_at']
			tweet_text = (status['text']).encode('ascii','ignore')
			tweet_favorite_count = status['favorite_count']
			tweet_retweet_count = status['retweet_count']
			tweet = {
				'created': tweet_created,
				'text': tweet_text,
				'favorite_count': tweet_favorite_count,
				'entities': getEntities(status['entities'])
			}
			tweets['tweet' + str(j)] = tweet

		## set up user data
		user_data = {}
		user_data['name'] = name
		user_data['shortname'] = shortname
		user_data['category'] = category
		user_data['user_name'] = user
		user_data['followers'] = followers
		user_data['description'] = description
		user_data['profile_image'] = profile_image
		user_data['profile_banner'] = profile_banner

		tweet_dict[shortname] = {
			'user_data': user_data,
			'tweets': tweets
		}

json_data.close()
json_file = open('../../data/social_media/twitter/' + group + '.json', 'w')
json_file.write(json.dumps(tweet_dict, indent=4))
json_file.close()