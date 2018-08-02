var express = require('express');
var router = express.Router();
var User = require('../models/user');
var tipper = require('../models/tipper');
var tippee = require('../models/tippee');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  User.findByIdAndUpdate(req.user._id, function(){
    var tip1 = new tipper({
      tipperID : req.user._id,
      tipAmount : 40,
      tipTo : 'dddd'
    });

    tip1.save(function(err){
      console.log(err);
    });
  });

  tipper.find().populate('tipperID').exec(function(err, tipper){
    console.log(tipper);
  });

  tippee.find().populate('tippeeID').exec(function(err, tippee){
    console.log(tippee);
  });


  // var mongoose = require('mongoose');
  // var Schema = mongoose.Schema;

  // var personSchema = Schema({
  //   _id: Schema.Types.ObjectId,
  //   name: String,
  //   age: Number,
  //   stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  // });

  // var storySchema = Schema({
  //   author: { type: Schema.Types.ObjectId, ref: 'Person' },
  //   title: String,
  //   fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
  // });

  // var Story = mongoose.model('Story', storySchema);
  // var Person = mongoose.model('Person', personSchema);

  // var author = new Person({
  //   _id: new mongoose.Types.ObjectId(),
  //   name: 'Ian Flejhjhjghjming',
  //   age: 50
  // });
  
  // author.save(function (err) {
  //   if (err) return handleError(err);
  
  //   var story2 = new Story({
  //     title: 'Cascdcdino Royale',
  //     author: author._id    // assign the _id from the person
  //   });
  
  //   story2.save(function (err) {
  //     if (err) return handleError(err);
  //     // thats it!
  //   });
  // });

  // Story.
  // find().
  // populate('author').
  // exec(function (err, story) {
  //   if (err) return handleError(err);
  //   // console.log('The author is %s', story.author.name);
  //   console.log(story);
  //   // prints "The author is Ian Fleming"
  // });
  res.render('learn', { title: 'Express' });

  });

module.exports = router;
