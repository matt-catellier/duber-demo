module.exports = function (app, passport) {

    app.get('/test', function(req,res,next) {
        res.send('test');
    })
    
    app.get('/test', function(req,res,next) {
        res.send('test');
    })
    app.post('/api/login', function(req,res,next) {
        passportAuthenticate('local-login', req,res,next, passport);
    })

    app.post('/api/register', function(req,res, next) {
        passportAuthenticate('local-register',req,res,next,passport);
    });

    app.get('/api/profile', isLoggedIn, function (req, res) {
        res.send(require('./templates/profile')(req).html);
    });

    app.get('/api/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

function passportAuthenticate(approach, req,res,next, passport) {
    passport.authenticate(approach, function(err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            if (! user) {
                return res.send({ success : false, message : info.message});
            }
            // attemps to login via passprt?
            req.login(user, loginErr => {
                if (loginErr) { 
                    return next(loginErr);
                } 
                return res.send({ success : true, url : '/profile' });
            });  
        })(req, res, next); 
}
