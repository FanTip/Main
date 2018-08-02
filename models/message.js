var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var messageSchema = new Schema({
    messageFrom:{type:Schema.Types.ObjectId, ref:'user'},
    content:{type:String},
    sentOn : {type:Date}
});

var Message = mongoose.model('Message', messageSchema);