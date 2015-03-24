import requests
import re
from urllib import urlopen
from pprint import pprint

response = requests.get('http://www.huffingtonpost.co.uk/news/ukfilmcomedy/feed/')
# print (response.status_code)
# print (response.content)

titles = re.findall(r'<title>(.*?)</title>', response.content)
links = re.findall(r'<link.*?href="(.*?)"', response.content)

for title in titles:
	print title

for link in links:
	print link

# http://www.youtube.com/watch?v=CMyoQbBq5IE&index=2&list=PLQVvvaa0QuDfRO5bQFLcVgvIOIhNUZpZf