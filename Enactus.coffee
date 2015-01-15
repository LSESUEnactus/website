##
## Dependencies
##
express = require 'express'
logger = require 'morgan'
favicon = require 'serve-favicon'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'express-session'

##
## Express
##
app = module.exports = express()
app.disable 'x-powered-by'
app.use logger 'dev' unless module.parent
app.use require('compression')()

##
## Mailgun (Email)
##
if MAILGUN_API_KEY = process.env.MAILGUN_API_KEY and MAILGUN_API_URL = process.env.MAILGUN_API_URL
    Mailgun = require 'mailgun-js'
    app.set 'mailgun', new Mailgun
        apikey: MAILGUN_API_KEY, domain: MAILGUN_API_URL

##
## Templating
##
app.engine 'hjs', require 'hogan-express'
app.set 'view engine', 'hjs'
app.set 'views', __dirname + '/views'
app.set 'layout', '_layouts/default'
app.set 'partials',
    header: '_partials/header'
    footer: '_partials/footer'

##
## Assets
##
expires = 2628000000
app.use favicon __dirname + '/public/dist/favicon.ico',
    maxAge: expires
app.use express.static __dirname + '/public/dist',
    maxAge: expires
app.use '/components', express.static __dirname + '/bower_components',
    maxAge: expires

##
## Request body
##
app.use bodyParser.urlencoded()
app.use require('express-validator')()

##
## Config
##
app.set 'port', process.env.PORT or 3000
app.set 'routes', require './config/routes'
app.use require './config/variables'

##
## Session
##
app.use '/contact-us', cookieParser process.env.COOKIE_SECRET or 'not so secret cookie'
app.use '/contact-us', session
    secret: process.env.SESSION_SECRET or 'not so secret session'
    resave: false
    saveUninitialized: true
app.use '/contact-us', require('csurf')()

##
## Router
##
require('./controllers') app
app.use require('errorhandler')() if 'development' is app.get 'env'

unless module.parent
    app.listen app.get 'port'
    console.log "\nExpress server listening on port #{app.get 'port'}\n"