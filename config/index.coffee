exports.development = (req, res, next) ->
	res.locals =
	    page:
	        title: 'LSE SU Enactus'
	        description: 'London School of Economics and Political Science Student Union Enactus &ndash; Seeing possibilities. Taking action. Enabling progress.'
	    analytics:
	    	id: 'UA-5243796-8'
	    	url: 'enactuslse.co.uk'
	    social:
	    	twitter: '//twitter.com/EnactusLSE'
	    	facebook: '//fb.com/LSESUEnactus'
	    styles: [
	        '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700'
	        '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css'
	        '/css/enactus.css'
	    ]
	    scripts: [
	        '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'
	        '//cdnjs.cloudflare.com/ajax/libs/foundation/5.0.2/js/foundation.min.js'
	        #'/components/jquery-snowfall/snowfall.min.jquery.js'
	        '/js/plugins.js'
	        '/js/enactus.js'
	    ]
	next()