var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var tipper = require('../models/tipper');
var tippee = require('../models/tippee');


router.use(csrfProtection);

router.get('/', function(req, res, next){
    var tips;
    tipper.find({tipperID : req.user._id}).populate('tipperID').exec(function(err, tipper){
        tippee.find({tipeeID : req.user._id}).populate('tipeeID').exec(function(err, tippee){
          res.render('fan/fantiphistory',{tippeedata : JSON.stringify(tippee) , tipperdata : JSON.stringify(tipper)});
        });
    });
});

module.exports = router;