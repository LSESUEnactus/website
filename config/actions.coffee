exports.index = (req, res) ->
    res.locals.page.title += " - Welcome!"
    res.locals.page.class = 'landing'
    res.locals.scripts.push '/components/background-video/jquery.backgroundvideo.min.js'
    res.locals.scripts.push '/js/landing.js'
    res.render 'index', layout: false