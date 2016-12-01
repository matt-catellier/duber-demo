var root = { root: './app/views' };

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.sendfile('index.html', root);
    });

    app.get('/login', function(req, res) {
        res.sendfile('login.html', root);
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/register', function(req, res) {
        res.sendfile('register.html', root);
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // function(req, res) {
    //     console.log(req.body.email + ' ' + req.body.password);
    //     res.sendfile('register.html', root);
    // });
   

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // will use route middleware to verify this (the isLoggedIn function)

    var template = require('./templates/profile');
    app.get('/profile', isLoggedIn, function(req, res) {
        // get user data...
        res.send(`<!doctype html>
<html>
<head>
    <title>Node Authentication</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css">
    <style>
        body        { padding-top:80px; word-wrap:break-word; }
    </style>
</head>
<body>
<div class="container">

    <div class="page-header text-center">
        <h1><span class="fa fa-anchor"></span> Profile Page</h1>
        <a href="/logout" class="btn btn-default btn-sm">Logout</a>
    </div>

    <div class="row">

        <!-- LOCAL INFORMATION -->
        <div class="col-sm-6">
            <div class="well">
                <h3><span class="fa fa-user"></span> Local</h3>

                    <p>
                        <strong>id</strong>: ${ req.user._id }<br>
                        <strong>email</strong>: ${ user.local.email }<br>
                        <strong>password</strong>: ${ user.local.password }
                    </p>

            </div>
        </div>

    </div>

</div>
</body>
</html>`);
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
