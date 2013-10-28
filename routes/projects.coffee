exports.social = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Social Projects"
	res.render 'what-we-do/social-projects'

exports.commercial = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Commercial Projects"
	res.render 'what-we-do/commercial-projects'

exports.new = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Start a New Project"
	res.render 'what-we-do/start-a-new-project'