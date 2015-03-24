import json
import requests
from urllib import urlopen
from pprint import pprint

group = 'actors'
# groups = [actors, actresses, artists, directors, hosts, misc, music,
# performers, politics, sports, writers, youtube]

CLIENT_ID = '45f304a1c8e54c33a399672a9720ef51'
json_data = open('../../data/people/' + group + '.json')
data = json.load(json_data)

def getUser(user):
	return 'https://api.instagram.com/v1/users/' + str(user) + '/media/recent/?client_id=' + CLIENT_ID

new_dict = {}

def getDataStuff(person_data):
	photos = {}
	for j, photum in enumerate(person_data['data']):
		photo = {}
		photo['low_resolution'] = photum['images']['low_resolution']['url']
		photo['thumbnail'] = photum['images']['thumbnail']['url']
		photo['standard_resolution'] = photum['images']['standard_resolution']['url']
		photo['filter'] = photum['filter']
		photo['comment_count'] = photum['comments']['count']
		photo['likes_count'] = photum['likes']['count']
		photo['created_time'] = photum['created_time']
		photo['caption'] = photum['caption']
		photos['photo' + str(j)] = photo

	user_data = person_data['data'][0]['user']
	image_data = person_data['data'][0]['images']
	fullname = user_data['full_name']

	user = {}
	user['name'] = name
	user['category'] = category
	user['username'] = user_data['username']
	user['fullname'] = user_data['full_name']
	user['id'] = user_data['id']
	user['profile_picture'] = user_data['profile_picture']	

	new_dict[name] = {
		'user': user,
		'photos': photos
	}

for i, item in enumerate(data):
	if(item['social'][0]['instagram_id'] != ''):
		name = item['name']
		category = item['type'][0]
		instagram_id = item['social'][0]['instagram_id']

		try:
			feed_read = urlopen(getUser(instagram_id)).read()
			feed_data = json.loads(feed_read)
		except (IOError, ValueError):
			print "This is an error message!"
		else:
			try:
				getDataStuff(feed_data)
			except KeyError:
				print 'no data available'

json_file = open('../../data/social_media/instagram/' + group + '.json', 'w')
json_file.write(json.dumps(new_dict, indent=4))
json_file.close()