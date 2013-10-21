exports.enactus = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - About Enactus"
	res.render 'about/enactus'

exports.lsesu = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - About Us"
	res.render 'about/us'