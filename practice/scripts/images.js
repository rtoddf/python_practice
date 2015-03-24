var images

$(document).ready(function(){
	Panda.get()
})

var Panda = new function(){
	this.get = function(){
		$.getJSON('python/images.json', function(data){
			for(key in data){
				console.log('key: ', data[key])
			}
			images = data
			console.log('images: ', images)
		})
	}
}

var templateRaw = '<h3>Images</h3> \
<div class="col-md-3"> \
</div>'