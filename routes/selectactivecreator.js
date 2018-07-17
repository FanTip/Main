var express = require('express');
var router = express.Router();
var User = require('../models/user');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);


/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  res.render('creator/selectactivecreator', { title: 'Express', csrfToken : req.csrfToken() });
});

router.post('/delete', isLoggedIn, function(req, res, next){

  User.findByIdAndUpdate(req.user._id,
    {$set:{
      'creator.isCreator' : false,
      'creator.creatorName' : "",
      'creator.creatorDesc' : "",
      'creator.creatorEmail' : ""
    }}).exec(function(err){
    if(err){
      res.send(err);
    }
    res.redirect('/profile');
    
  });
});


module.exports = router;
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect('/');
}