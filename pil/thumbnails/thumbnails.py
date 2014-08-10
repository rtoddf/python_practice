from PIL import Image
import glob, os

size = 300, 170

for infile in glob.glob('*.jpg'):
	file, ext = os.path.splitext(infile)
	image = Image.open(infile)
	image.thumbnail(size, Image.ANTIALIAS)
	image.save(file + '.thumbnail.jpg', 'JPEG')