import re

text01 = 'Grab your bow ties and bouquets! #MarriageEquality in #Illinois, officially goes into effect statewide today. #NOH8 pic.twitter.com/vhsKqiWN9f,'

mentions = re.findall(r'[#]\w*', text01)
images = re.findall(r'\w{3}\.\w{7}\.\w{3}\/.+\w', text01)
boundary = re.findall(r'\pic.twitter.com/\w+', text01)
case = re.findall(r'\grab', text01, flags=re.IGNORECASE)

print('mentions: ' + str(mentions))
print('images: ' + str(images))
print('boundary: ' + str(boundary))
print('case: ' + str(case))

'''
\d matches any number
\D matches any non number
\s matches any space
\S matches any non space
\w matches any letter
\W matches any non letter
\b matches word boundaries

. matches anything
\. matches period

+ matches one or more
* matches 0 or more
? matches 0 or 1

$ matches the beginning of the string
^ matches the end of the string

[] matches anything in the brackets
| or


FLAGS
flags=re.IGNORECASE













'''