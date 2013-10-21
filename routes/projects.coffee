exports.social = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Social Projects"
	res.render 'projects/social'

exports.commercial = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Comercial Projects"
	res.render 'projects/commercial'

exports.new = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Start a New Project"
	res.render 'projects/new'