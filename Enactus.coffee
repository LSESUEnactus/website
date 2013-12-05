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
app.use express.static path.join(__dirname, 'public');
app.use app.router
app.use express.errorHandler() if 'development' is app.get 'env'

NotFound = (req, res) ->
    res.locals.page.title = "Oops, we can't find what you are looking for! - #{res.locals.page.title}"
    res.status 404
    res.render '404', layout: false

app.get '/', actions.index;

## 
## Christmas Bash Facebook Event (Temporary)
## 
app.get '/xmas', (req, res) ->
    res.redirect 'https://www.facebook.com/events/233160706853421'

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
        res.locals.current.location.push
            title: page.title
            slug: req.params.page
            active: true

        res.render "#{req.params.namespace}/#{req.params.page}"
    catch error
        console.log error
        NotFound req, res

app.use (req, res, next) ->
    NotFound req, res

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get 'port'}"