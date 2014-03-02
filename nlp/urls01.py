from urllib import urlopen

url = "http://www.rtodd.net/index.html"
html = urlopen(url).read()

print html[:60]