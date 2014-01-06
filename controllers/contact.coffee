index = (req, res) ->
    res.locals.page.title = "Contact Us - #{res.locals.page.title}"
    res.locals.current =
        title: 'Contact Us'
        slug: 'contact-us'
    res.locals.token = req.csrfToken()
    res.locals.scripts.push '/js/contact.js'

    #if req.method === 'POST'
        # E-mail

module.exports = 
	index: index