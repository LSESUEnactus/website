exports.development = (req, res, next) ->
	res.locals =
	    page:
	        title: 'LSE SU Enactus'
	        description: 'London School of Economics and Political Science Student Union Enactus &ndash; Seeing possibilities. Taking action. Enabling progress.'
	    social:
	    	twitter: '//twitter.com/EnactusLSE'
	    	facebook: '//fb.com/LSESUEnactus'
	    styles: [
	        '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700'
	        '/css/enactus.css'
	    ]
	    scripts: [
	        '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'
	        '/js/vendor/foundation/foundation.js'
	        '/js/vendor/foundation/foundation.topbar.js'
	        '/js/plugins.js'
	        '/js/enactus.js'
	    ]
	next()