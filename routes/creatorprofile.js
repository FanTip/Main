var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var mongoose = require('mongoose');
var csrfProtection = csrf();
var passport = require('passport');
router.use(csrfProtection);

var User = require('../models/user');

/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
  console.log(req.user.creator.isCreator);
  res.render('creatorprofile', { title: 'Express', csrfToken : req.csrfToken()});
});

router.post('/updatecreator',isLoggedIn, function(req, res, next){
  console.log(req.body);
  User.findByIdAndUpdate(req.user._id,{
    $set:{'creator.creatorCategories' : req.body.name}
  }).exec(function(err, result){

  });
});

router.post('/create',isLoggedIn, function(req, res, next){
    console.log(req.body);
    console.log(req.user);    
    User.findByIdAndUpdate(
      req.user._id, 
      { $set:{'creator.isCreator' : true,
      'creator.creatorName': req.body.creator_name,
      'creator.creatorDesc': req.body.creator_description,
      'creator.creatorEmail' : req.body.creator_email
    }
      }
      
      ,).
      exec(function(err, result){
      console.log(err);
      if(result){
        console.log('updated');
        // res.status(200).send(result);
        res.render('creatorprofile', {csrfToken : req.csrfToken()});
      }
    });
    

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