index = (req, res) ->
    res.locals.page.title += " - Welcome!"
    res.locals.page.class = 'landing'
    res.locals.styles.unshift '//cdnjs.cloudflare.com/ajax/libs/animate.css/3.1.0/animate.min.css'
    res.locals.scripts.push '/components/background-video/jquery.backgroundvideo.min.js'
    res.locals.scripts.push '/components/Morphext/dist/morphext.min.js'
    res.locals.scripts.push '//cdn.enactuslse.co.uk/js/landing.js'
    res.render 'index', layout: '_layouts/blank'

module.exports =
    index: index