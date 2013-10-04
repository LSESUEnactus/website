$(function() {
	// BigVideo
	var BV = new $.BigVideo();
	BV.init();
	BV.show('assets/vids/freshers.mp4', {ambient:true});

	// Textualizer
	var list = ['#EnactusLSESU #Freshers',
				'Seeing possibilities. Taking Action. Enabling progress',
				'Sign up as a member with the SU to receive more information and updates',
				'Enactus UK National Competition Rookies of the Year 2010',
				'Enactus UK National Competition Semi Finalists 2011, 2012, 2013',
				'LSE SU STARS Gold Award 2012 and Silver Award 2013',
				'Corporate Sponsor: Citi'
			   ];
	var txt = $('.js-textualizer');
	var options = {
	  duration: 3000,
	  rearrangeDuration: 300,
	  effect: 'random',
	  centered: true
	}
	txt.textualizer(list, options);
	txt.textualizer('start');

	// Resize and centre
	var $window = $(window);
    var $centreMarginObj = $('.js-centre');
    var $centreMarginHeight;
    var centreMargin = function () {
        $centreMarginHeight = $window.outerHeight() - $centreMarginObj.outerHeight();
        if ($centreMarginHeight < 0)
        	$centreMarginHeight = 0;
        $centreMarginObj.css('margin', $centreMarginHeight / 2 + 'px auto 0');
    }
    $window.load(centreMargin);
    $window.resize(centreMargin);
});