var express = require('express');
var router = express.Router();
var User = require('../models/users');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();

    } else {
        var err = new Error('You must be logged in to view this page.');
        console.log("giriş Gerekli");
        err.status = 401;
        return next(err);
    }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.post('/', function(req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });
    }
});

// GET /logout
router.get('/logout',requiresLogin , function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

router.get('/signup', function(req, res, next) {

    res.render('signup');
});
router.post('/signup', function(req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }
        console.log(req.body)
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/profile');
            }
        });
    }

});


module.exports = router;
