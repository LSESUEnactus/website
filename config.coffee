exports.development = (req, res, next) ->
	res.locals =
	    page:
	        title: 'Enactus LSE SU'
	        description: 'Enactus London School of Economics and Political Science Student Union &ndash; Seeing possibilities. Taking action. Enabling progress.'
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