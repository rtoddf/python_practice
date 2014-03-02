# def monty():
# 	return 'Monty Python'

# print monty()

sent = ['Take', 'care', 'of', 'the', 'sense', ',', 'and', 'the', 'sounds', 'will', 'take', 'care', 'of', 'themselves', '.']

def extract_property(prop):
	return [prop(word) for word in sent]

def last_letter(word):
	return word[-1]

# print sent
# print extract_property(len)
# print extract_property(last_letter)
print extract_property(lambda w: w[-1])

print sorted(sent, cmp)
print sorted(sent, lambda x, y: cmp(len(y), len(x)))