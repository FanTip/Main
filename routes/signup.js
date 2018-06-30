var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');

router.use(csrfProtection);

router.use('/', notLoggedIn, function(req, res, next){
  console.log('var: ', req.session.errors);
  
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Signup', csrfToken : req.csrfToken(), messages : req.session.errors});
});

// authenticate user
router.post('/', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}
// check if the user is logged in or not
function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
      return next();
  }
  res.redirect('/signup');
}