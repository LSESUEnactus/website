$(document).foundation();

$(function () {
	if (!Modernizr.touch) {
	    $('.footer').onScreen({
	        doIn: function () {
	            $(this).find('.js-onScreen').show();
	        },
	        doOut: function () {
	            $(this).find('.js-onScreen').hide();
	        },
	        tolerance: '-50'
	    });
	} else {
		$('.js-onScreen').css({
			'bottom': '0',
			'position': 'relative'
		}).show();
	}
});