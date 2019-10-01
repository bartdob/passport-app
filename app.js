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
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser(User.serializeUser());       //session to code incode
passport.deserializeUser(User.deserializeUser());

//++++++++++++++++++++++++++++++++++++++++++++++++
//ROUTS
//


app.get('/', function (req, res) {
  res.render("home");
})


app.get('/secret', function (req, res){
	res.render("secret");
})

// ROUTS FORM REGISTER

app.get('/register', function(req, res){
	res.render("register");
})

app.post('/register', function(req, res){
	req.body.username;
	req.body.password;
	req.body.password2;
	
	User.register(new User({username: req.body.username}), req.body.password, 
	function(err, user){
		if(err){
		console.log(err);
			console.log(req.body.username);
			console.log(req.body.password);
		return res.render('register');
	}
	passport.authenticate("local")(res, req, function(){
		res.redirect("/secret");
	});
});
});

app.listen(3000, function(){
	console.log("+++++++++++++UP and RUNNING+++++++++++++")
})	