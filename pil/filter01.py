from PIL import Image
from PIL import ImageFilter

image = Image.open('images/thumbnails/p185113_i_h11_aa.jpg')
# image.rotate(45).show()

im1 = image.filter(ImageFilter.BLUR).show()

# http://effbot.org/imagingbook/image.htm
# http://effbot.org/imagingbook/imagefilter.htm
# http://pillow.readthedocs.org/en/latest/reference/Image.html
# http://effbot.org/imagingbook/introduction.htm