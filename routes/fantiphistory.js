var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var tipper = require('../models/tipper');
var tippee = require('../models/tippee');


router.use(csrfProtection);

router.get('/', function(req, res, next){
    var tips;
    tipper.find().populate('tipperID').exec(function(err, tipper){
        tippee.find().populate('tipeeID').exec(function(err, tippee){
        // console.log(tippee);
          res.render('fan/fantiphistory',{tippeedata : tippee , tipperdata : tipper});
        });
      });
    
      

    //   res.render('fan/fantiphistory',{tippeedata : tippee , tipperdata : tipper});    
    
    console.log('tips:', tips);

});

module.exports = router;