var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var tipper = require('../models/tipper');
var tippee = require('../models/tippee');
var async = require('async');

router.use(csrfProtection);

        //   res.render('fan/fantiphistory',{tippeedata : JSON.stringify(tippee) , tipperdata : JSON.stringify(tipper)});


router.get('/', function(req,res,next){
    async.parallel({
        tippe:function(callback){tipper.find({tipperID : req.user._id}).populate('tipperID').exec(callback);},
        tipper:function(callback){tippee.find({tipeeID : req.user._id}).populate('tipeeID').exec(callback);}
    },function(err, result){
        console.log('parallel',result);
    });
    tipper.find({tipperID : req.user._id}).populate('tipperID').exec(function(err, tipper){
        tippee.find({tipeeID : req.user._id}).populate('tipeeID').exec(function(err, tippee){
            res.render('fan/fantiphistory',{tippeedata : JSON.stringify(tippee) , tipperdata : JSON.stringify(tipper)});
        });
    });
});

// router.get('/tipper', function(req, res, next){
//     var tips;
//     tipper.find({tipperID : req.user._id}).populate('tipperID').exec(function(err, tipper){
//         if(req.xhr){
//             return res.json(tipper)
//         }
//     });
// });
// router.get('/tippee', function(){
//     tippee.find({tipeeID : req.user._id}).populate('tipeeID').exec(function(err, tippee){
//         if(req.xhr){
//             console.log('req',req.xhr);
//             return res.json(tippee);
//         }
//     });
// });



module.exports = router;