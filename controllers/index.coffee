class Controller
    constructor: (@app) ->
        # cdn.enactuslse.co.uk or sifelse.co.uk -> enactuslse.co.uk
        @_redirects()

        # Index
        @app.get '/', require('./home.coffee')['index']

        # CONTACT US NEEDS FIXING

        # Other pages
        @routes = @app.get('routes')
        for controller of @routes
            if not @routes[controller]['actions']?
                return @_setGet controller

            for action of @routes[controller]['actions']
                @_setGet controller, action

        # 404
        @app.use @_notFound

    _setGet: (controller, action) ->
        if action?
            @app.get "/#{controller}/#{action}", (req, res) =>
                title = @routes[controller]['actions'][action]['title']
                @_setTitle res, title
                @_setBreadcrumbs res, title, action, 
                                [ title: @routes[controller]['title'], slug: controller ]
                @_render res, "#{controller}/#{action}"
        else
            @app.get "/#{controller}", (req, res) =>
                title = @routes[controller]['title']
                @_setTitle res, title
                @_setBreadcrumbs res, title, controller
                @_render res, "#{controller}/index"

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