var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var User = require('../models/user');
router.use(csrfProtection);

/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
  res.render('editfanprofile', {title: 'Edit', csrfToken : req.csrfToken()});
});

router.post('/', function(req, res, next){
  console.log(req.body);
  var query = {
    email : req.body.email,
    name : req.body.name,
    description : req.body.description
  }
  User.findByIdAndUpdate(req.user._id, query, function(err, result){
    if(err){
      res.send(err);
    }
    res.redirect('/editfanprofile');

  });
});

// Delete the account 
router.post('/delete', isLoggedIn, function(req, res, next){
  User.findByIdAndRemove(req.user._id, function(err){
    console.log('here');
    if(err){
      res.send(err);
    }
    req.logout();
    req.session.destroy();
    res.redirect('/');
    
  });
});

router.post('/changepassword', isLoggedIn, function(req, res, next){
  if(req.user.validPassword(req.body.currentpassword)){
    var newEncryptedPassword = req.user.encryptPassword(req.body.newpassword);
    var query = {
      password : newEncryptedPassword
    }
    console.log(query);
    User.findByIdAndUpdate(req.user._id, query,{new: true}, function(err, result){
      if(err){
        console.log(err);
        res.send(err);
      }
      console.log(result);
      res.redirect('/editfanprofile');
    });
  }

});

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