exports.index = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Welcome!"
	res.locals.scripts.unshift '/js/vendor/video.js'
	res.render 'index'