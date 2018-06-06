var async = require('async');
var User = require('../models/user');

exports.user_profile = function(req, res, next){
    async.parallel(
        {
            User: function(callback){
                User.findOne(req.param.email).exec(callback);
            }
        },
        function(err, results){
            if(err) {return next(err);}

            if(results.user == null){
                let err = new Error('User not found');
                err.status = 404;
                return next(err);
            }

            var resUser = {
                name: results.name,
                email: results.email,
            }

            res.render('profile', {name : resUser.name})
        }
    )
};
