class Controller
    constructor: (@app) ->
        # cdn.enactuslse.co.uk or sifelse.co.uk -> enactuslse.co.uk
        @_redirects()

        # Index
        @app.get '/', require('./home.coffee')['index']

        # Contact us
        if process.env.MAILGUN_API_KEY?
            @app.post '/contact-us', (req, res) =>
                require("./contact.coffee")['postIndex'](req, res, @)

        # Other pages
        @routes = @app.get('routes')
        for controller of @routes
            if not @routes[controller]['actions']?
                @_setGet controller
                continue

            for action of @routes[controller]['actions']
                @_setGet controller, action

        # 404
        @app.use @_notFound

    _setGet: (controller, action) ->
        if action?
            route = "/#{controller}/#{action}"
            title = @routes[controller]['actions'][action]['title']
            custom = @routes[controller]['actions'][action]['custom']
        else
            route = "/#{controller}"
            title = @routes[controller]['title']
            custom = @routes[controller]['custom']
            action = 'index'

        @app.get route, (req, res) =>
            require("./#{custom}.coffee")[action](req, res, @) if custom?

            @_setTitle res, title
            if action is 'index'
                @_setBreadcrumbs res, title, controller
            else
                @_setBreadcrumbs res, title, action,
                                [ title: @routes[controller]['title'], slug: controller ]
            @_render res, "#{controller}/#{action}"

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

    _redirects: ->
        @app.all '/*', (req, res, next) ->
            res.redirect 301, '//' + res.locals.page.url if req.header('host').match /(cdn.enactuslse|sifelse)/i
            next()

    _notFound: (req, res, next) ->
        res.locals.page.title = "Oops, we can't find what you are looking for! - #{res.locals.page.title}"
        res.status 404
        res.render '404',  layout: '_layouts/blank'

module.exports = (app) ->
    new Controller app