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

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/register', function (req, res) {
        res.sendfile('register.html', root);
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/profile', isLoggedIn, function (req, res) {
        res.send(require('./templates/profile')(req).html);
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};
