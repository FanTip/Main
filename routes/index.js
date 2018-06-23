var express = require('express');
var router = express.Router();
var empty = require('is-empty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    var objs = [];
  // if(req.user.name == 'undefined'){
  //   username = "f";
  // }else{
  //   username = "req.user.name";
    // }
    fs.readFile('public\\javascripts\\support.js', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        
        var datajson = JSON.parse(data);
        for (i = 0; i < datajson.data.length; i++) {
             objs.push(datajson.data[i].imagepath);
        }
        console.log(objs[2]);
        res.render('index', { title: 'Fantipper', objects: objs });
    });
    
    //res.render('index', { title: 'Fantipper', objects: objs });

});

module.exports = router;
