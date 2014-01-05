##
## Dependencies
##
express = require 'express'
http = require 'http'
path = require 'path'

##
## Express
##
app = express()

##
## Config (Middleware)
##
config = require './config'
actions = require './config/actions'
routes = require './config/routes'

app.set 'port', process.env.PORT or 3000

##
## Mailgun (Email)
##
mailgun = require('mailgun-js') process.env.MAILGUN_API_KEY, process.env.MAILGUN_API_URL if process.env.MAILGUN_API_KEY?

##
## Templating
##
app.use config.production # Template globals
app.enable 'view cache'
app.engine 'hjs', require 'hogan-express'
app.set 'views', path.join __dirname, 'views'
app.set 'view engine', 'hjs'
app.set 'layout', 'layout'
app.set 'partials', 
    header: 'header'
    footer: 'footer'

app.disable 'x-powered-by'
app.use express.logger('dev' if 'development' is app.get 'env')
app.use express.compress()
app.use express.methodOverride()
app.use express.json()
app.use express.urlencoded()

##
## Assets
##
app.use express.favicon path.join __dirname, 'public/favicon.ico'
app.use express.static path.join __dirname, 'public'
app.use '/components', express.static path.join __dirname, 'bower_components'

##
## Session
##
app.use '/contact-us', express.cookieParser()
app.use '/contact-us', express.session { secret: process.env.SESSION_SECRET or 'not so secret' }
app.use '/contact-us', express.csrf()

##
## Router
##
app.use app.router
app.use express.errorHandler() if 'development' is app.get 'env'

# 404
NotFound = (req, res) ->
    res.locals.page.title = "Oops, we can't find what you are looking for! - #{res.locals.page.title}"
    res.status 404
    res.render '404', layout: false

# sifelse.co.uk -> enactuslse.co.uk
app.all '/*', (req, res, next) ->
    res.redirect 301, '//enactuslse.co.uk' if req.header('host').match /sifelse/i
    next()

# Index
app.get '/', actions.index

# Contact us
if process.env.MAILGUN_API_KEY?
    app.get '/contact-us', actions.contact
    app.post '/contact-us', actions.contact

# Other pages
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