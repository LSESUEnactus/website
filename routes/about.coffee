exports.enactus = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - What is Enactus?"
	res.render 'about/enactus'

exports.lsesu = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Enactus @ LSE"
	res.render 'about/us'

exports.bab = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Business Advisory Board"
	res.render 'about/bab'