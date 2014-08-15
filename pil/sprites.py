import urllib
import os, sys
import random
from PIL import Image

# where to save the images you are downloading
image_directory = 'images/thumbnails/'

image_urls_base = 'http://tube.tmsimg.com/'

# urls for 30 images
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
'h10/AllPhotos/10367302/p10367302_i_h10_aa.jpg',
'h11/AllPhotos/8601149/p8601149_i_h11_aa.jpg',
'h11/AllPhotos/10426921/p10426921_i_h11_aa.jpg',
'h11/AllPhotos/9967027/p9967027_i_h11_aa.jpg',
'h11/AllPhotos/10552215/p10552215_i_h11_aa.jpg',
'h11/AllPhotos/185171/p185171_b_h11_ad.jpg',
'h10/AllPhotos/9957510/p9957510_i_h10_aa.jpg',
'h10/AllPhotos/10230693/p10230693_i_h10_aa.jpg',
'h10/AllPhotos/10362866/p10362866_i_h10_aa.jpg',
'h10/AllPhotos/9719232/p9719232_i_h10_aa.jpg',
'h10/AllPhotos/10016553/p10016553_i_h10_aa.jpg',
'h10/AllPhotos/9980214/p9980214_i_h10_aa.jpg']

# settings - currently only one size, but other sizes (md, sm, xs) can be added later
settings = {
    'width': 300,
    'height': 168,
    'total_images': 30
}

# size of the thumbnails before pasting into larger image
size = settings['width'], settings['height']

if not os.path.exists(image_directory):
    os.makedirs(image_directory)

# download all images and save them to a thumbnails dir
for im in image_urls:
    image_url = image_urls_base + str(im)
    image_dest =  image_directory + im.rsplit('/', 1)[-1]
    urllib.urlretrieve(image_url, image_dest)

# get all files (after downloaded) with the .jpg extension
def get_imlist(path):
    return [os.path.join(path, f) for f in os.listdir(path) if f.endswith('.jpg')]

# read the images from the dir - returns a list
image_list = get_imlist(image_directory)
    
# new image dimensions
sprite_dimensions = (settings['total_images'] * settings['width'], settings['height'])
sprite_image = Image.new('RGB', sprite_dimensions, 'white')

the_images = []

for image in image_list:
    im = Image.open(image)
    im.thumbnail(size, Image.ANTIALIAS)
    the_images.append(im)

# shuffle the images randomly
random.shuffle(the_images)

for i in range(settings['total_images']):
    sprite_image.paste(the_images[i], (i * settings['width'], 0))

# show() is only here for you to view the outcome
# it can be commented out
sprite_image.show()
sprite_image.save('images/tile_background_lg_sprite.jpg', 'JPEG')

# clear all image that were downloaded
for image in image_list:
    os.remove(image)
