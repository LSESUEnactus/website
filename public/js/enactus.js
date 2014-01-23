$(document).foundation();
//$(document).snowfall({ shadow : true, flakeCount: 100 });

$(function () {
	var $onScreenObj = $('.js-onScreen');

	if (!Modernizr.touch)
	    $('.footer').onScreen({
	        doIn: function () {
	            $onScreenObj.show();
	        },
	        doOut: function () {
	            $onScreenObj.hide();
	        },
	        tolerance: '-50'
	    });
	else
		$onScreenObj.css({
			'bottom': '0',
			'position': 'relative'
		}).show();
});