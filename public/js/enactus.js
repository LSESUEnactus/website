$(document).foundation();

$(function () {
	if (!Modernizr.touch) {
	    $('.footer').onScreen({
	        doIn: function () {
	            $(this).find('.footer__content').show();
	        },
	        doOut: function () {
	            $(this).find('.footer__content').hide();
	        },
	        tolerance: '-50'
	    });
	}
});