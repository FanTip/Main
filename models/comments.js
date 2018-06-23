var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var CommentSchema = new Schema({
    fan_id:{type:ObjectId},
    comment:{type:String}
});