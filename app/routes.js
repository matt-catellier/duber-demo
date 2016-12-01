module.exports = function(app, passport) {
    var root = { root: './app/views' };

    app.get('/', function(req, res) {
        res.sendfile('index.html', root);
    });

    app.get('/login', function(req, res) {
        res.sendfile('login.html', root);
    });

    app.post('/login', function(req, res) {
        // res.sendFile(path.join(__dirname + '/views/login.html'));
    });

    app.get('/register', function(req, res) {
        res.sendfile('register.html', root);
    });

    app.post('/register', passport.authenticate('local-register', {
        successRedirect: '/profile',
        failureRedirect: '/register',
        failureFlash: true
    }));

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}
