$('.toggleShow').on('click', function(){
	var expandDiv = $('#expand')
	if(!expandDiv.hasClass('expanded')){
		expandDiv.show(250).addClass('expanded')
	} else {
		expandDiv.hide(250).removeClass('expanded')
	}
})