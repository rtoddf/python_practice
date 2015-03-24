if(window.Promise){
	var promise = new Promise(function(resolve, reject){
		var request = new XMLHttpRequest()

		request.open('GET', 'http://api.icndb.com/jokes/random')
		request.onload = function(){
			if(request.status == 200){
				resolve(request.response);
				console.log('we got data')
			} else {
				reject(Error(request.statusText))
				console.log('rejected')
			}
		}

		request.onerror = function(){
			reject(Error('Error fetching data'))
			// error occurred - rejected the promise
		}

		request.send()
	})

	promise.then(function(data){
		
		data = JSON.parse(data)
		console.log(data)
		$('#joke').html(data['value'].joke)
	}, function(error){
		console.log('we got an error')
		console.log(error.message)
	})
} else {
	console.log('get a new browser dipshit!')
}