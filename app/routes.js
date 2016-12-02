var root = { root: './app/views' };
// route middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.sendfile('index.html', root);
    });

    app.get('/login', function (req, res) {
        res.sendfile('login.html', root);
    });

    app.post('/login', function(req,res,next) {
        passport.authenticate('local-login', function(err, user, info) {
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
    })
    
    

    app.get('/register', function (req, res) {
        res.sendfile('register.html', root);
    });

    app.post('/register', function(req,res, next) {
        passport.authenticate('local-signup',function(err, user, info) {
            if(err) {
                res.send(JSON.stringify(err.message));
            } 
            if(!user) {

            }
            res.redirect('/profile');
        })
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.send(require('./templates/profile')(req).html);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};
