var express = require('express')
var app = express();

/* set the port of our application
process.env.PORT lets the port be set by Heroku */
var port = process.env.PORT || 8080;

/* Cluster the APP */
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;

/* Get input date which occurs after the domain name in the URL */
var getDateFromUrl = function(url) {
    return decodeURI(url).split('/')[1]; 
}

/* Allow access from any other domain: CORS */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

/* return JSON unix and natural language timestamp to client */
app.get('/:path*', function(req, res, next) {
    res.json(require('./timestamp-api.js').timestampApi(getDateFromUrl(req.originalUrl)))
    next();
})

// set the home page route
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, function() {
    console.log('app is running on http://localhost:' + port);
});
