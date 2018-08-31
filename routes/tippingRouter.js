var express = require('express');
var router = express.Router();
var empty = require('is-empty');
var fs = require('fs');
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var User = require('../models/user');
var toastr = require('toastr');
var tipper = require('../models/tipper');
var tippee = require('../models/tippee');

router.use(csrfProtection);

router.post('/', function(req, res, next){
    console.log('req.body', req.body);
});

router.get('/',function(req, res, next){
    User.find(function(err, result){
        res.send(result);
    });
});
router.post('/', function(req, res, next){
    console.log(req.body);
});

router.post('/sendtip', function(req, res, next){

    if(res.locals.login){
        var tipperData = new tipper({
            tipperID : req.user._id,
            tipAmount : req.body._tipamount,
            tipTo : req.body._creatorEmail,
            tipDate : Date.now()
        });
        console.log(tipperData);
        tipperData.save(function(err){
            if(err){
                console.log(err);
            }
            User.findOne({'creator.creatorEmail':req.body._creatorEmail}).exec(function(err, creator){
                var tippeeData = new tippee({
                    tipeeID : creator._id,
                    tipAmount : req.body._tipamount,
                    tipFrom : req.body._creatorEmail,
                    tipMessage : req.body._message,
                    tipDate : Date.now(),
                });
                tippeeData.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        res.status(200).send('done');
                    }
                });
            });
            
        });

    }else{
        User.findOne({'creator.creatorEmail':req.body._creatorEmail}).exec(function(err, creator){
            console.log(creator._id);
            var tipeeData = new tippee({
                tipeeID : creator._id,
                tipAmount : req.body._tipamount,
                tipFrom : req.body._email,
                tipMessage : req.body._message,
                tipDate : Date.now(),
            });
            console.log(tipeeData);
            tipeeData.save(function(err){
                if(err){ res.status(500).send(err);}
                else{
                    
                    res.status(200).send('done');
                }
                
            });
        });
        
        console.log(req.body);
    }
});


module.exports = router;