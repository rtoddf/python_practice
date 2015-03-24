nums = [2, 4, 6, 8, 10]
the_sum = sum(nums)
the_sum_all = reduce(lambda a,b: a+b, nums)
print 'the_sum: ' + str(the_sum)
print 'the_sum_all: ' + str(the_sum_all)

letters = ['a', 'b', 'c']
sum_of_all = reduce(lambda a,b: a+b, letters)
print 'sum_of_all: ' + str(sum_of_all)

myList = [
	{'name':'Homer', 'age':39},
	{'name':'Bart', 'age':10}
]
newList = sorted(myList, key=lambda k: k['name'])

print 'myList: ' + str(myList)
print 'newList: ' + str(newList)