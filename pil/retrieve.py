import urllib
import os, sys
from PIL import Image

photo_directory = 'images/'
image_base_url = 'http://tube.tmsimg.com/h10/AllPhotos/'

photos = [9248657, 185113, 9994933, 10426177, 3563021, 186700, 185554, 10291619, 9263605, 10475136, 9248657, 
9991822, 9895254, 10106164, 10063537, 9957538, 10086642, 10024445, 10372543, 10102709, 10367302]

# def get_photo(phoot_id):
#     image_url = image_base_url + phoot_id + '/p' + phoot_id + '_i_h11_aa.jpg'
#     image_dest = photo_directory + phoot_id + '.jpg'
#     urllib.urlretrieve(image_url, image_dest)

# for photo in photos:
#     get_photo(str(photo))

# The format attribute identifies the source of an image. If the image was not read from a file,
# it is set to None. The size attribute is a 2-tuple containing width and height (in pixels).
# The mode attribute defines the number and names of the bands in the image, and also the pixel 
# type and depth. Common modes are L (luminance) for greyscale images, RGB for true colour 
# images, and CMYK for pre-press images.

# If the file cannot be opened, an IOError exception is raised.

image = Image.open('images/10475136.jpg')
thumbnail_directory = 'images/thumbnails/'
size = 300, 170

# for infile in sys.argv[1:]:
# 	print 'infile: ', infile

outfile = 'thumbnails/image.jpg'
# image.thumbnail(size)
out = image.resize((300, 170))
out.save(outfile, 'JPEG')

print 'out.size: ', out.size

# print 'image.format: ', image.format
# print 'image.size: ', image.size
# print 'image.mode: ', image.mode

# image.show()