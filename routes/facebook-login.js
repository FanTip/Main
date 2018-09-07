var express = require('express');
var router = express.Router();
var User = require('../models/user');
var tipper = require('../models/tipper');
var tippee = require('../models/tippee');
var mongoose = require('mongoose');
var passport = require('passport');
/* GET home page. */
router.get('/', passport.authenticate('facebook', {
    scope:['email']
}));

router.get('/callback', passport.authenticate('facebook',{
    successRedirect : '/profile',
    failureRedirect : '/'
}));

module.exports = router;
