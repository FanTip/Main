var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var controller = require('../controller/usercontroller');
var User = require('../models/user');

router.use(csrfProtection);
 
/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
    console.log('req: ', req.user.name);
    // User.find({email : req.email}, function(err, users){
    //     if(err){ return res.write('Error'); }
    //     var Username = users.name;
    //     res.render('profile', { title: 'profile', name: Username});
    // });
    res.render('profile', { title: 'profile ', name: req.user.name || req.newUser.name, email : req.user.email || req.newUser.email});
    console.log('id ',req.session.username);
});

// authenticate user

// router.get('/', isLoggedIn, controller.user_profile);

module.exports = router;
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/signup');
  }
