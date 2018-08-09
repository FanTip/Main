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
    res.send('vbhjfbhdjb');
});
router.post('/', function(req, res, next){
console.log(req.body);
});

router.post('/sendtip', function(req, res, next){
    res.send('data received!');

    if(res.locals.login){
        var tipperData = new tipper({
            tipperID : req.user._id,
            tipAmount : req.body.tipamout,
            tipTo : req.body._creatorEmail,
            tipDate : Date.now()
        });
        tipperData.save(function(err){
            if(err){
                console.log(err);
            }
            User.findOne({'creator.creatorEmail':req.body._creatorEmail}).exec(function(err, creator){
                var tippeeData = new tippee({
                    tipeeID : creator._id,
                    tipAmount : req.body.tipamout,
                    tipFrom : req.body._creatorEmail,
                    tipMessage : req.body.message,
                    tipDate : Date.now(),
                });
                tippeeData.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                        res.redirect('/');
                    }
                });
            });
            
        });

    }else{
        User.findOne({'creator.creatorEmail':req.body._creatorEmail}).exec(function(err, creator){
            console.log(creator._id);
            var tipeeData = new tippee({
                tipeeID : creator._id,
                tipAmount : req.body.tipamout,
                tipFrom : req.body.email,
                tipMessage : req.body.message,
                tipDate : Date.now(),
            });
            tipeeData.save(function(err){
                if(err){ res.send(err);}
                else{
                    
                    res.redirect('/');
                }
                
            });
        });
        
        console.log(req.body);
    }
});


module.exports = router;