exports.events = (req, res) ->
	res.locals.page.title = res.locals.page.title + " - Events"
	res.render 'what-is-new/events'