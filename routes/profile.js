var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var controller = require('../controller/usercontroller');
var User = require('../models/user');

router.use(csrfProtection);
 
router.post('/', isLoggedIn, function(req, res, next){
    console.log(req.body);
    var profileUser = req.newUser || req.user;
    var query = {email : profileUser.email};
    console.log(profileUser);
    console.log('desc', req.body.des);
    var newDesc = {description : req.body.des}
    User.findOneAndUpdate(query, newDesc, function(err, doc){
        if(err){
            console.log(err);
        }
        console.log('doc',doc);
        res.render('profile', { title: 'profile ', 
                            name: doc.name , 
                            email : doc.email ,
                            description: doc.description,
                            file: doc.imagepath ,
                            csrfToken : req.csrfToken()
        });
    });
});


/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
    console.log('req: ', req.user.name);
    res.render('profile', { title: 'profile ', 
                            name: req.user.name || req.newUser.name, 
                            email : req.user.email || req.newUser.email,
                            description: req.user.description || req.newUser.description,
                            file: req.user.imagepath || req.newUser.imagepath,
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
