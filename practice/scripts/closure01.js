function showName(fn, ln){
	var nameIntro = 'Your name is '

	function makeFullName(){
		return nameIntro + fn + ' ' + ln
	}

	return makeFullName()
}

var theName = showName('Michael', 'Jackson')
console.log('theName: ', theName)


function calledFunction(passedFunction) {
    passedFunction("newValue");
}

function clickMe() {
    var value = "originalValue";

    alert(value);

    calledFunction(function(externalValue) {
        value = externalValue;
    });

    alert(value);
}

clickMe()









