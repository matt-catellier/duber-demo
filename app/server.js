var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./database/connection');
mongoose.connect(configDB.url); 
var db = mongoose.connection;
db.once('open', function () { console.log("MongoDB connected to: " + configDB.url) });
db.on('error', function (err) {
    console.error('MongoDB error: %s', err);
});

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies 
app.use(express.static( path.join(__dirname, '/app/public')));
app.use(bodyParser()); // get information from html forms

app.use(session({ secret: '#$%8909809890890sdafds98#$%$@@' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
app.get('*', function (req, res) { res.redirect('/'); }); // catchall route

app.listen(port);
console.log('The server running on port ' + port);
