express = require 'express'
routes = require './routes'
http = require 'http'
path = require 'path'

app = express();
app.set 'port', process.env.PORT or 3000

app.use (req, res, next) ->
    res.locals =
        page:
            title: 'Enactus LSE SU'
            description: 'Enactus London School of Economics and Political Science Student Union &ndash; Seeing possibilities. Taking action. Enabling progress.'
        styles: [
            '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700'
            '/css/enactus.css'
        ]
        scripts: [
            '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'
            '/js/vendor/foundation/foundation.js'
            '/js/vendor/foundation/foundation.topbar.js'
            '/js/plugins.js'
            '/js/enactus.js'
        ]
    next()

app.enable 'view cache'
app.engine 'hjs', require('hogan-express')
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'hjs'
app.set 'layout', 'layout'
app.set 'partials', { header: 'header', footer: 'footer' }

app.use express.favicon path.join(__dirname, 'public/favicon.ico')
app.use express.logger('dev')
app.use express.bodyParser()
app.use express.methodOverride()
app.use app.router
app.use express.static path.join(__dirname, 'public');
app.use express.errorHandler() if 'development' is app.get 'env'

app.get '/', routes.index;

http.createServer(app).listen app.get('port'), ->
  console.log "Express server listening on port #{app.get 'port'}"