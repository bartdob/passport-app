const express 				= require('express'),
	  gi 					= require(`gitignore`),
	  passport  			= require('passport'),
	  bodyParser			= require('body-parser'),
	  User 					= require('./models/user'),
	  mongoose				= require('mongoose'),
	  integerValidator = require('mongoose-integer'),
	  LocalStrategy 		= require('passport-local'),
	  passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost/pass_app", { useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
  if (err) {
    console.error(err)
    return
  }});

var app = express();


app.use(require("express-session")({
	secret: "rolnik sam w dolinie", // use to encoude and decode
	resave: false,
	saveUninitialized: false
}));


app.set('view engine', 'ejs');
app.use(passport.initialize()); //inicjacja passportu
app.use(passport.session());	//j.w.

passport.serializeUser(User.serializeUser());       //session to code incode
passport.deserializeUser(User.deserializeUser());


app.get('/', function (req, res) {
  res.render("home");
})

app.get('/secret', function (req, res){
	res.render("secret");
})

app.listen(3000, function(){
	console.log("+++++++++++++UP and RUNNING+++++++++++++")
})	