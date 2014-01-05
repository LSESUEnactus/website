##
## Controllers
##
exports.index = (req, res) ->
    res.locals.page.title += " - Welcome!"
    res.locals.page.class = 'landing'
    res.locals.styles.unshift '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.0.0/animate.min.css'
    res.locals.scripts.push '/components/background-video/jquery.backgroundvideo.min.js'
    res.locals.scripts.push '/components/Morphext/morphext.min.js'
    res.locals.scripts.push '/js/landing.js'
    res.render 'index', layout: false

exports.contact = (req, res) ->
    res.locals.page.title = "Contact Us - #{res.locals.page.title}"
    res.locals.current =
        title: 'Contact Us'
        slug: 'contact-us'
    res.locals.token = req.csrfToken()
    res.locals.scripts.push '/js/contact.js'

    #if req.method === 'POST'
        # E-mail

    res.render 'contact-us'
