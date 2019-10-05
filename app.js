const express 					= require('express'),
	  gi 						= require(`gitignore`),
	  bodyParser				= require('body-parser'),
	  User 						= require('./models/user'),
	  mongoose					= require('mongoose'),
	  integerValidator 			= require('mongoose-integer'),
	  passport  				= require('passport'),
	  LocalStrategy 			= require('passport-local'),
	  passportLocalMongoose 	= require('passport-local-mongoose'),
	  {check,validationResult} 	= require('express-validator'),
	  router 					= express.Router();

mongoose.connect("mongodb://localhost/pass_app", { useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
  if (err) {
    console.error(err)
    return
  }});

var app = express();


app.use(require("express-session")({
	secret: "rolnik sam w dolinie", // use to encoude and decode
	resave: false,
	saveUninitialized: false,
	cookie: {maxAge: 1000}
}));


app.set('view engine', 'ejs');
app.use(passport.initialize()); //inicjacja passportu
app.use(passport.session());	//j.w.
app.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser(User.serializeUser());       //session to code incode
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

//++++++++++++++++++++++++++++++++++++++++++++++++
//ROUTS
//


app.get('/', function (req, res) {
  res.render("home");
})


app.get('/secret', isLoggedIn, function (req, res){
	res.render("secret");
})

// ROUTS FORM REGISTER

app.get('/register', function(req, res){
	res.render("register");
})

// app.route('/register', function(req, res){
// 	req.body.username;
// 	req.body.password;
// 	req.body.password2;

// //  check('email', 'email is required').isEmail(),
//   check('username', 'username is required').not().isEmpty(),
//   check('password', 'password is required').not().isEmpty(),
//   check('password2', 'password2 is required').not().isEmpty(),
//  // check('password').isLength({ min: 4 }),
//   function(req, res, next) {
//   //check validate data
//   const result= validationResult(req);
//   var errors = result.errors;
//   for (var key in errors) {
//         console.log(errors[key].value);
//   }
//   if (!result.isEmpty()) {
//   //response validate data to register.ejs
//      res.render('register', {
//       errors: errors
//   });
//   };
// }});
// USER TO DATABASE	
app.post('/register', function (req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, 
	function(err, user){
		if(err){
		console.log(err);
			console.log(req.body.username);
			console.log(req.body.password);
		return res.render('register');
	}
	if(req.body.password===req.body.password2){
	passport.authenticate('local')(res, req, function(){
		res.redirect("/secret");
	})}else{
		console.log ("Password do not macht");
	};
});
});
app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
	res.send("you are logg out");
    req.logout();
    res.redirect("/");
});
	

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, function(){
	console.log("+++++++++++++UP and RUNNING+++++++++++++");
})