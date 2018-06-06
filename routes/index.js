var express = require('express');
var router = express.Router();
var empty = require('is-empty');


/* GET home page. */
router.get('/', function(req, res, next) {

  // if(req.user.name == 'undefined'){
  //   username = "f";
  // }else{
  //   username = "req.user.name";
  // }

  res.render('index', { title: 'Express' });
});

module.exports = router;
