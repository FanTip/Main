var express = require('express');
var router = express.Router();
var empty = require('is-empty');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('index: ', req.user);
    var username;
    var imagepath;
    if(req.user != undefined){
        console.log('name: ', req.user);
        username = req.user.name;
        imagepath = req.user.imagepath;
    }
    var objs = [];
  
    fs.readFile('public\\javascripts\\support.js', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        
        var datajson = JSON.parse(data);
        for (i = 0; i < datajson.data.length; i++) {
             objs.push(datajson.data[i].imagepath);
        }
        console.log(objs[2]);
        res.render('index', { 
            title: 'Fantipper', 
            objects: objs,
            name : username,
            imagePath : imagepath
        });
    });
    
    //res.render('index', { title: 'Fantipper', objects: objs });

});

module.exports = router;
