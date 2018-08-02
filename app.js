var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const exphbs = require('express-handlebars');
var icons = require('glyphicons');
var favicon = require('serve-favicon');

require('./config/passport');

var apiRouter = require('./routes/api/fantipper');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var profileRouter = require('./routes/profile');
var logoutRouter = require('./routes/logout');
var exploreRouter = require('./routes/explore');
var learnRouter = require('./routes/learn');
var editImage = require('./routes/editImage');
var editFanProfile = require('./routes/editfanprofile');
var creatorProfile = require('./routes/creatorprofile');
var selectActiveCreator = require('./routes/selectactivecreator');
var tippingRouter = require('./routes/tippingRouter');

var fanTipHistory = require('./routes/fantiphistory');

var app = express();
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon', 'favicon.ico')));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.engine('.hbs', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'hbs', exphbs({
  defaultLayout : 'layout',
  layoutsDir : 'views/profile'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'fantipper', resave:false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  if(req.isAuthenticated()){
    res.locals.imagePath = req.user.imagepath;
    res.locals.email = req.user.email;
    res.locals.name = req.user.name;
    res.locals.description = req.user.description;
    if(req.user.creator.isCreator){
      console.log('creator profile made');
      res.locals.isCreator = req.user.creator.isCreator;
      res.locals.CreatorName = req.user.creator.creatorName;
      res.locals.CreatorDescription = req.user.creator.creatorDesc;
      res.locals.CreatorUserName = req.user.creator.creatorNameuser;
      res.locals.CreatorURL = req.user.creator.creatorUrl;
      res.locals.CreatorAbout = req.user.creator.creatorAbout;
    }
    if(req.user.card.isCard){
      res.locals.cardOptions = req.user.card.isCard;
      res.locals.cardName = req.user.card.cardName;
      res.locals.cardNumber = req.user.card.cardNumber;
      res.locals.cardExp = req.user.card.cardExpNum;
      res.locals.cardCVV = req.user.card.cvvNum;
    }
  }
  next();
});



app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/glyphicons/glyphicons.js')));
// Path to Quill
app.use('/quill', express.static(path.join(__dirname, 'node_modules/quill/dist')));



app.use('/', indexRouter);
app.use('/editImage', editImage);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/logout', logoutRouter);
app.use('/learn', learnRouter);
app.use('/explore', exploreRouter);
app.use('/editfanprofile', editFanProfile);
app.use('/creatorprofile', creatorProfile);
app.use('/selectactivecreator', selectActiveCreator);
app.use('/tipping', tippingRouter);
app.use('/api/fantipper', apiRouter);

app.use('/fantiphistory', fanTipHistory);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.render('pagenotfound');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect('mongodb://localhost/FanTipper');
let db = mongoose.connection;
db.once('open', function(){
  console.log('Connection Successful');
});



module.exports = app;
