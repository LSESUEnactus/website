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
app.set 'mailgun', require('mailgun-js') process.env.MAILGUN_API_KEY, process.env.MAILGUN_API_URL if process.env.MAILGUN_API_KEY?

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
app.use express.favicon path.join __dirname, 'public/favicon.ico'
app.use express.static path.join __dirname, 'public'
app.use '/components', express.static path.join __dirname, 'bower_components'

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
app.use '/contact-us', express.session { secret: process.env.SESSION_SECRET or 'not so secret' }
app.use '/contact-us', express.csrf()

##
## Router
##
app.use app.router
app.use express.errorHandler() if 'development' is app.get 'env'

require('./controllers') app

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get 'port'}"