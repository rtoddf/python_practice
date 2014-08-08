import urllib

photo_directory = 'images/'
image_base_url = 'http://tube.tmsimg.com/h10/AllPhotos/'

photos = [9248657, 185113, 9994933, 10426177, 3563021, 186700, 185554, 10291619, 9263605, 10475136, 9248657, 
9991822, 9895254, 10106164, 10063537, 9957538, 10086642, 10024445, 10372543, 10102709, 10367302]

def get_photo(phoot_id):
    image_url = image_base_url + phoot_id + '/p' + phoot_id + '_i_h11_aa.jpg'
    image_dest = photo_directory + phoot_id + '.jpg'
    urllib.urlretrieve(image_url, image_dest)

for photo in photos:
    get_photo(str(photo))
