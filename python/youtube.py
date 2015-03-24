import json
import requests
from urllib import urlopen
from pprint import pprint

YOUTUBE_BASE = 'https://www.googleapis.com/youtube/v3/'
CLIENT_ID = 'AIzaSyCB8yTZfPExoyQe4jNaHVMLBzJr5VHsW18'

group = 'actors'
# groups = [actors, actresses, artists, directors, hosts, misc, music,
# performers, politics, sports, writers, youtube]

json_data = open('../../data/people/' + group + '.json')
status_data = json.load(json_data)
youtube_dict = {}

def getchannelId(user):
	return YOUTUBE_BASE + 'channels?part=snippet&forUsername=' + user + '&key=' + CLIENT_ID

def getActivity(channel):
	return YOUTUBE_BASE + 'activities?part=snippet&channelId=' + channel + '&maxResults=10&key=' + CLIENT_ID

for i, item in enumerate(status_data):
	if(item['social'][0]['youtube'] != ''):
		name = item['name']
		shortname = item['shortname']
		category = item['type'][0]
		user = item['social'][0]['youtube']

		clientIdCall = urlopen(getchannelId(user)).read()
		client_data = json.loads(clientIdCall)

		user_youtube_data = client_data['items'][0]['snippet']
		clientid = client_data['items'][0]['id']

		videoCall = urlopen(getActivity(clientid)).read()
		videoData = json.loads(videoCall)
		videoActivity = videoData['items']

		videos = {}
		for j, vid in enumerate(videoActivity):
			video = {}
			video['video_id'] = vid['id']
			try:
				video['title'] = vid['snippet']['title']
			except KeyError, e:
				print 'I got a KeyError - reason "%s"' % str(e)
			except IndexError, e:
				print 'I got an IndexError - reason "%s"' % str(e)
			video['activity_type'] = vid['snippet']['type']
			video['published'] = vid['snippet']['publishedAt']
			video['thumbnail'] = vid['snippet']['thumbnails']['medium']['url']
			video['thumbnail_large'] = vid['snippet']['thumbnails']['high']['url']
			videos['video' + str(j)] = video

		user_data = {}
		user_data['name'] = name
		user_data['shortname'] = shortname
		user_data['category'] = category
		user_data['user_name'] = user
		user_data['clientid'] = clientid
		user_data['title'] = user_youtube_data['title']
		user_data['description'] = user_youtube_data['description']
		user_data['published'] = user_youtube_data['publishedAt']
		user_data['thumbnail'] = user_youtube_data['thumbnails']['default']
		user_data['thumbnail_large'] = user_youtube_data['thumbnails']['high']

		youtube_dict[name] = {
			'user_data': user_data,
			'videos': videos
		}

json_file = open('../../data/social_media/youtube/' + group + '.json', 'w')
json_file.write(json.dumps(youtube_dict, indent=4))
json_file.close()