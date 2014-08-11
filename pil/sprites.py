import urllib
import os, sys
import random
from PIL import Image

image_urls_base = 'http://tube.tmsimg.com/'
image_directory = 'images/thumbnails/'

settings = {
    'width': 300,
    'height': 170,
    'num_vertical': 4,
    'num_horizontal': 5,
    'total_images': 20
}

image_urls = ['h11/AllPhotos/185113/p185113_i_h11_aa.jpg',
'h11/AllPhotos/9994933/p9994933_i_h11_aa.jpg',
'h11/AllPhotos/10426177/p10426177_i_h11_aa.jpg',
'h11/AllPhotos/3563021/p3563021_i_h11_aa.jpg',
'h11/AllPhotos/186700/p186700_i_h11_aa.jpg',
'h11/AllPhotos/185554/p185554_i_h11_aa.jpg',
'h11/AllPhotos/10291619/p10291619_i_h11_aa.jpg',
'h11/AllPhotos/9263605/p9263605_i_h11_ab.jpg',
'h11/AllPhotos/10475136/p10475136_i_h11_aa.jpg',
'h10/AllPhotos/9248657/p9248657_i_h11_aa.jpg',
'h10/AllPhotos/9991822/p9991822_i_h11_aa.jpg',
'h10/AllPhotos/9895254/p9895254_i_h11_aa.jpg',
'h10/AllPhotos/10106164/p10106164_i_h11_aa.jpg',
'h10/AllPhotos/10063537/p10063537_i_h11_aa.jpg',
'h10/AllPhotos/9957538/p9957538_i_h11_aa.jpg',
'h10/AllPhotos/10086642/p10086642_i_h11_aa.jpg',
'h10/AllPhotos/10024445/p10024445_i_h11_aa.jpg',
'h10/AllPhotos/10372543/p10372543_i_h11_aa.jpg',
'h10/AllPhotos/10102709/p10102709_i_h10_aa.jpg',
'h10/AllPhotos/10367302/p10367302_i_h10_aa.jpg']

def get_imlist(path):
    return [os.path.join(path, f) for f in os.listdir(path) if f.endswith('.jpg')]

# download all images and save them to a thumbnails dir
for im in image_urls:
    image_url = image_urls_base + str(im)
    image_dest =  image_directory + im.rsplit('/', 1)[-1]
    # urllib.urlretrieve(image_url, image_dest)

# read the images from the dir - returns a list
image_list = get_imlist(image_directory)

# new image dimensions
sprite_dimensions = (settings['num_horizontal'] * settings['width'], settings['num_vertical'] * settings['height'])
sprite_image = Image.new('RGB', sprite_dimensions, 'white')

the_images = []

for image in image_list:
    im = Image.open(image)
    im = im.resize((settings['width'], settings['height']))
    the_images.append(im)

random.shuffle(the_images)

for i in range(settings['total_images']):
    if i >= (settings['num_horizontal'] * 0) and i < settings['num_horizontal']:
        sprite_image.paste(the_images[i], ((i - (settings['num_horizontal'] * 0)) * settings['width'], settings['height'] * 0))

    if i >= (settings['num_horizontal'] * 1) and i < (settings['num_horizontal'] * 2):
        sprite_image.paste(the_images[i], ((i - (settings['num_horizontal'] * 1)) * settings['width'], settings['height'] * 1))

    if i >= (settings['num_horizontal'] * 2) and i < (settings['num_horizontal'] * 3):
        sprite_image.paste(the_images[i], ((i - (settings['num_horizontal'] * 2)) * settings['width'], settings['height'] * 2))

    if i >= (settings['num_horizontal'] * 3) and i < (settings['num_horizontal'] * 4):
        sprite_image.paste(the_images[i], ((i - (settings['num_horizontal'] * 3)) * settings['width'], settings['height'] * 3))

sprite_image.show()
sprite_image.save('images/tile_background_lg_sprite.jpg', 'JPEG')

# clear all image that were downloaded
# for image in image_list:
#     os.remove(image)
