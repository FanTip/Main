var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var personSchema = new Schema({
    name: {type: String, required:true},
    email:{type: String, required:true},
    username : {type :String},
    password: {type: String, required:true},
    messages:{type: String},
    offers:{type:String},
    imagepath:{type:String},
    tiphistory:{type:String},
    description:{type:String},
    numberOfTips:{
                    numberOfCreatorsTipped:{type:Number},
                    totalNumberOfTips:{type:Number}
                }
});

//encrypting the password
personSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

//decrypting password and compare the passwords
personSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model(
    'user', personSchema
);
