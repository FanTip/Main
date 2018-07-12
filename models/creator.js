var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var creatorSchema = new Schema({
	name : {type: String, required: true},
	email : {type : String, required : true},
	fanID : {type : String, required : true},
	description : {type : String},
	country : {type : String}
});

module.exports = mongoose.model(
	'creator', creatorSchema
);