class Controller
    constructor: (@app) ->
        @_buildControllers()

        # sifelse.co.uk -> enactuslse.co.uk
        @_redirectSIFE()

        # Index
        @app.get '/', @controllers['home']['index']

        # Contact us
        if process.env.MAILGUN_API_KEY?
            @app.post '/contact-us', (req, res) =>
                @controllers['contact-us']['index'](req, res, @)

        # Other pages
        @app.get '/:controller/:action?', (req, res) =>
            # Find controller and return 404 if it is not found
            controller = @routes[req.params.controller] ? @_notFound req, res
            action = controller.actions?[req.params.action]
            currentTitle = action?.title ? controller.title

            # Set metadata
            @_setTitle res, currentTitle
            @_setBreadcrumbs res, currentTitle, req.params.action ? req.params.controller, 
                            [title: controller.title, slug: req.params.controller] if action?

            req.params.action ?= 'index'

            # Call controller if it exists
            if @controllers[req.params.controller]?[req.params.action]?
                @controllers[req.params.controller][req.params.action] req, res, @

            @_render res, "#{req.params.controller}/#{req.params.action}"

        @app.use @_notFound

    _setTitle: (res, title) ->
        res.locals.page.title = "#{title} - #{res.locals.page.title}"

    _setBreadcrumbs: (res, title, slug, location) ->
        res.locals.current =
            title: title
            slug: slug
            location: location

    _render: (res, template) ->
        res.render template, {}, (error, html) =>
            return @_notFound false, res if error
            res.end html

    _buildControllers: ->
        @routes = @app.get('routes')
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