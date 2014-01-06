class Controller
    constructor: (@app) ->
        @_buildControllers()

        # sifelse.co.uk -> enactuslse.co.uk
        @_redirectSIFE()

        # Index
        app.get '/', @controllers['home']['index']

        # Contact us
        if process.env.MAILGUN_API_KEY?
            app.post '/contact-us', @controllers['contact-us']['index']

        # Other pages
        app.get '/:controller/:action?', (req, res) =>
            try
                controller = app.get('routes')[req.params.controller]
                action = controller.actions?[req.params.action]

                pageTitle = action?.title ? controller.title

                res.locals.page.title = "#{pageTitle} - #{res.locals.page.title}"
                res.locals.current =
                    title: pageTitle
                    slug: req.params.action ? req.params.controller
                    location: []

                if action?
                    # Set history
                    res.locals.current.location.push
                        title: controller.title
                        slug: req.params.controller
                else
                    # Set index as the default action if undefined
                    req.params.action = 'index'

                # Call controller if it exists
                if @controllers[req.params.controller]?[req.params.action]?
                    @controllers[req.params.controller][req.params.action] req, res

                res.render "#{req.params.controller}/#{req.params.action}", {}, (error, html) =>
                    return @_notFound req, res if error
                    res.end html

            catch error
                console.log error
                @_notFound req, res

        app.use (req, res, next) =>
            @_notFound req, res, next

    _buildControllers: ->
        @controllers = 
            'home': require './home.coffee'
            'contact-us': require './contact.coffee'

    _redirectSIFE: ->
        @app.all '/*', (req, res, next) =>
            res.redirect 301, '//enactuslse.co.uk' if req.header('host').match /sifelse/i
            next()

    _notFound: (req, res, next) ->
        res.locals.page.title = "Oops, we can't find what you are looking for! - #{res.locals.page.title}"
        res.status 404
        res.render '404',  layout: '_layouts/blank'

module.exports = (app) ->
    new Controller app