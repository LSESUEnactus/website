##
## Dependencies
##
express = require 'express'
http = require 'http'
path = require 'path'
validator = require 'express-validator'

##
## Express
##
app = express()

##
## Mailgun (Email)
##
MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
MAILGUN_API_URL = process.env.MAILGUN_API_URL
if MAILGUN_API_KEY?
    Mailgun = require 'mailgun-js'
    app.set 'mailgun', new Mailgun apikey: MAILGUN_API_KEY, domain: MAILGUN_API_URL

##
## Templating
##
app.enable 'view cache'
app.engine 'hjs', require 'hogan-express'
app.set 'views', path.join __dirname, 'views'
app.set 'view engine', 'hjs'
app.set 'layout', '_layouts/default'
app.set 'partials',
    header: '_partials/header'
    footer: '_partials/footer'

##
## Middleware
##
app.disable 'x-powered-by'
app.use express.logger('dev' if 'development' is app.get 'env')
app.use express.compress()
app.use express.methodOverride()
app.use express.json()
app.use validator()
app.use express.urlencoded()

##
## Assets
##
expires = 2628000000
app.use express.favicon path.join(__dirname, 'public/dist/favicon.ico'),
    maxAge: expires
app.use express.static path.join(__dirname, 'public/dist'),
    maxAge: expires
app.use '/components', express.static path.join(__dirname, 'bower_components'),
    maxAge: expires

##
## Config
##
app.set 'port', process.env.PORT or 3000
app.set 'routes', require './config/routes'
app.use require './config/variables'

##
## Session
##
app.use '/contact-us', express.cookieParser()
app.use '/contact-us', express.session
    secret: process.env.SESSION_SECRET or 'not so secret'
app.use '/contact-us', express.csrf()

##
## Router
##
app.use app.router
app.use express.errorHandler() if 'development' is app.get 'env'

require('./controllers') app

http.createServer(app).listen app.get('port'), ->
    console.log "Express server listening on port #{app.get 'port'}"