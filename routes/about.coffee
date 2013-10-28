exports.enactus = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - What is Enactus?"
	res.render 'who-we-are/what-is-enactus'

exports.lsesu = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Enactus @ LSE"
	res.render 'who-we-are/enactus-lse'

exports.bab = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Business Advisory Board"
	res.render 'who-we-are/business-advisory-board'