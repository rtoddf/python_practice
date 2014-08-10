from PIL import Image
from PIL import ImageColor

directory = 'images/'
settings = {
	'width': 300,
	'height': 170,
	'num_vertical': 4,
	'num_horizontal': 5,
	'total_images': 20
}
# open and rotate
# image = Image.open('images/10367302.jpg')
# image.rotate(45).show()

image_dimensions = (settings['num_horizontal'] * settings['width'], settings['num_vertical'] * settings['height'])

# new
new_image = Image.new('RGB', image_dimensions, 'white')
# image.save(directory + 'new.jpg', 'JPEG')

size = settings['width'], settings['height']

# blend
image1 = Image.open('images/185113.jpg')
image2 = Image.open('images/185554.jpg')
mask = Image.open('images/mask.png')

image1.thumbnail(size, Image.ANTIALIAS)

# out = image1 * (1.0 - .5) + image2 * .5
# out = Image.blend(image1, image2, 0)
# out.show()

# composite
# out = Image.composite(image1, image2, mask)
# out.show()

# get bbox
# bbox = image1.getbbox()
# print 'bbox: ', bbox

# paste
new_image.paste(image1, (0, 0))
new_image.show()