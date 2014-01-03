express = require 'express'

config = require './config'
actions = require './config/actions'
routes = require './config/routes'

http = require 'http'
path = require 'path'

app = express()
app.set 'port', process.env.PORT or 3000

app.use config.development

app.enable 'view cache'
app.engine 'hjs', require 'hogan-express'
app.set 'views', path.join __dirname, 'views'
app.set 'view engine', 'hjs'
app.set 'layout', 'layout'
app.set 'partials', 
    header: 'header'
    footer: 'footer'

app.disable 'x-powered-by'
app.use express.logger 'dev'
app.use express.compress()
app.use express.json()
app.use express.urlencoded()
app.use express.methodOverride()

app.use '/contact-us', express.cookieParser()
app.use '/contact-us', express.session { secret: 'not so secret' }
app.use '/contact-us', express.csrf()

app.use express.favicon path.join __dirname, 'public/favicon.ico'
app.use express.static path.join __dirname, 'public'
app.use '/components', express.static path.join __dirname, 'bower_components'

app.use app.router
app.use express.errorHandler() if 'development' is app.get 'env'

NotFound = (req, res) ->
    res.locals.page.title = "Oops, we can't find what you are looking for! - #{res.locals.page.title}"
    res.status 404
    res.render '404', layout: false

app.all '/*', (req, res, next) ->
    res.redirect 301, '//enactuslse.co.uk' if req.header('host').match /sifelse/i
    next()

app.get '/', actions.index

app.get '/contact-us', actions.contact
app.post '/contact-us', actions.contact

app.get '/:namespace/:page', (req, res) ->
    try
        namespace = routes[req.params.namespace]
        page = namespace.subpages[req.params.page]
        res.locals.page.title = "#{page.title} - #{res.locals.page.title}"

        res.locals.current =
            title: page.title
            slug: req.params.page
            location: []

        res.locals.current.location.push
            title: namespace.title
            slug: req.params.namespace

        res.render "#{req.params.namespace}/#{req.params.page}"
    catch error
        console.log error
        NotFound req, res

app.use (req, res, next) ->
    NotFound req, res

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get 'port'}"