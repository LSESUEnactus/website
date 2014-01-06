index = (req, res) ->
    res.locals.token = req.csrfToken()
    res.locals.scripts.push '/js/contact.js'

    #if req.method === 'POST'
        # E-mail

module.exports = 
	index: index