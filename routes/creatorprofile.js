var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('creatorprofile', { title: 'Express' });
});

router.post('/create', function(req, res, next){
    console.log(req.body);
});
module.exports = router;