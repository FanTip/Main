var express = require('express');
const multer = require('multer');
const path = require('path');
var csrf = require('csurf');
var csrfProtection = csrf();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, filename, callback){
        callback(null, filename.fieldname+ '-' + Date.now() + path.extname(filename.originalname));
    }
});

const upload = multer({
    storage : storage,
    limits: {fileSize : 1000000},
    fileFilter:function(req, filename, callback){
        checkFileType(filename, callback);
        console.log(filename);
    }
}).single('profileImage');

csrf({cookie:true});

function checkFileType(filename, callback){
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(filename.originalname).toLowerCase());
    console.log('extname', extname);
    const mimeType = fileTypes.test(filename.mimetype);
    console.log('filename.mimeType', filename.mimeType);
    console.log(mimeType && extname);
    if(mimeType && extname){
        return callback(null, true);
    }else{
        callback('Error : Images only (Accepted extensions : jpeg,jpg,png,gif)');
    }
}

module.exports = {
    upload
}