// config/passport.js
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../database/models/user');

// expose this function to our app using module.exports
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err)
                return done(err);
            // if no user is found, return the message
            if (!user)
                return done(null, false, {'message': 'Incorrect username.'}); // req.flash is the way to set flashdata using connect-flash
            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false,  {'message': 'Incorrect password'}); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

    passport.use('local-register', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
        process.nextTick(function () { // wont fire unless data is sent back
            if(password != req.body.passwordConfirm) {
                return done(null, false,  {'message': 'Passwords must match.'});
            }
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false,  {'message': 'Invalid email.  Try another.'});
                } else {
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
