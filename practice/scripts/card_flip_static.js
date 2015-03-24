// http://davidwalsh.name/demo/css-flip.php
// http://davidwalsh.name/css-flip
// http://jsfiddle.net/nicooprat/GDdtS/

$('.flip').click(function(){
	$(this).find('.card').toggleClass('flipped')
	if($(this).css('z-index') == 0){
		$(this).css('z-index', 100)
	} else {
		$(this).css('z-index', 0)
	}
	return false;
});

 // ontouchstart="this.classList.toggle('hover');"