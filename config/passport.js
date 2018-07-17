var passport = require('passport'); //requiring the passport package
var User = require('../models/user'); //requiring the user model
var LocalStrategy = require('passport-local').Strategy; //requiring the passport local strategy

//Serializing the user
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//de-serializing the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

//implementation of the local strategy for the user signup
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    req.checkBody('email', 'Invalid email/password!').notEmpty().isEmail();
    req.checkBody('password', 'Invalid email/password!').notEmpty().isLength({min:4});
    req.checkBody('name', 'Name is required!').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
            req.session.errors = error.msg + '\n' ;
        });
        console.log('errors: ', errors);
        return done(null, false, req.flash('error', messages));
    }
    //finding the user in the database
    User.findOne({'email' : email}, function(err, user){
        if(err){
            return done(err);// return back eny errors
        }

        if(user){ //return an error message if user is already has an account
            req.session.errors = 'Email is already in use!';
            return done(null, false, {message: 'Email is already in use!'});
        }

        //creating a new user
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.param('name');
        newUser.messages = null;
        newUser.offers = null;
        newUser.imagepath = '/images/example.jpg';
        newUser.description = 'Tell us little bit about yourself';
        newUser.creator.isCreator = false;
        newUser.creator.creatorName = 'None provided';
        newUser.creator.creatorUrl = 'None provided';
        newUser.creator.creatorLocation = 'None provided';
        newUser.creator.creatorEmail = 'None Provided';
        newUser.card.isCard = false;
        
        console.log(req.param('name'));
        newUser.save(function(err, result){
            if(err){
                return done(err);
            }
            req.session.username = email;
            return done(null, newUser);
        });
    })
}));

//implementation of the local stategy to signin
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    req.checkBody('email', 'Invalid email/password').notEmpty().isEmail();
    req.checkBody('password', 'Invalid email/password').notEmpty();

    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
            req.session.errors = error.msg;
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email' : email}, function(err, user){
        if(err){
            return done(err);
        }
        //if no username is entered
        if(!user){
            req.session.errors = 'User not found!';
            return done(null, false, {message: 'no user found'});
        }
        //if the password is incorrect
        if(!user.validPassword(password)){
            req.session.errors = 'Incorrect password!';
            return done(null, false, {message: 'Wrong password'});
        }
        req.session.username = email;
        return done(null, user);
    })
}));
