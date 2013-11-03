exports.index = (req, res) ->
    res.locals.page.title += " - Welcome!"
    res.locals.scripts.unshift '/js/vendor/video.js'
    res.locals.scripts.push '/js/landing.js'
    res.render 'index', layout: false