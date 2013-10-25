express = require 'express'
namespace = require 'express-namespace'
config = require './config'

routes = require './routes'
about = require './routes/about'
projects = require './routes/projects'

http = require 'http'
path = require 'path'

app = express()
app.set 'port', process.env.PORT or 3000

app.use config.development

app.enable 'view cache'
app.engine 'hjs', require('hogan-express')
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'hjs'
app.set 'layout', 'layout'
app.set 'partials', 
    header: 'header'
    footer: 'footer'

app.use express.favicon path.join(__dirname, 'public/favicon.ico')
app.use express.logger('dev')
app.use express.compress()
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router
app.use express.static path.join(__dirname, 'public');
app.use express.errorHandler() if 'development' is app.get 'env'

app.get '/', routes.index;

app.namespace '/about', ->
    app.get '/enactus', about.enactus
    app.get '/us', about.lsesu
    app.get '/business-advisory-board', about.bab

app.namespace '/projects', ->
    app.get '/social', projects.social
    app.get '/commercial', projects.commercial
    app.get '/new', projects.new

app.use (req, res, next) ->
	res.status 404
	res.render '404'

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get 'port'}"