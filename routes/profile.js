var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var controller = require('../controller/usercontroller');
var User = require('../models/user');
var flash = require('connect-flash');

router.use(csrfProtection);
 
router.post('/', isLoggedIn, function(req, res, next){
    console.log(req.body);
    var profileUser = req.newUser || req.user;
    var query = {email : profileUser.email};
    console.log(profileUser);
    var email = req.user.email.substr(0, req.user.email.indexOf('@'));
    console.log('desc', req.body.email.split("@"));
    var newDesc = {description : req.body.des}
    User.findOneAndUpdate(query, newDesc, function(err, doc){
        if(err){
            console.log(err);
        }
        console.log('doc',doc);
        res.render('fan/profile', { title: 'profile ', 
                            url: email,
                            csrfToken : req.csrfToken()
        });
    });
});


/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
    console.log('req:ff ', req.user.name);
    console.log('new image', req.user.imagepath);
    var email = req.user.email.substr(0, req.user.email.indexOf('@'));
    console.log(email);
    req.flash('info', 'Hi there!')
    res.render('fan/profile', { title: 'profile ', 
                            body: '/faneditviews/fansummery',
                            url: email,
                            csrfToken : req.csrfToken()
    });
    console.log('id ', req.newUser);
});

// authenticate user
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
