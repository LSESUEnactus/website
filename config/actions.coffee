exports.index = (req, res) ->
    res.locals.page.title += " - Welcome!"
    res.locals.page.class = 'landing'
    res.locals.styles.unshift '/components/animate.css/animate.min.css'
    res.locals.scripts.push '/components/background-video/jquery.backgroundvideo.min.js'
    res.locals.scripts.push '/components/Morphext/morphext.min.js'
    res.locals.scripts.push '/js/landing.js'
    res.render 'index', layout: false