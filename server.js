// server.js

// set up ======================================================================
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./database/connection');
mongoose.connect(configDB.url); // connect to our database
var db = mongoose.connection;
db.once('open', function(){ console.log("MongoDB connected to: " + configDB.url)});
db.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies 
app.use(bodyParser()); // get information from html forms

// set up passport // CHANGE TO SALT!!!!
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.get('*',function (req, res) { res.redirect('/'); });
app.listen(port);
console.log('The server running on port ' + port);