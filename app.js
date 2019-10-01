const express 	= require('express')
const app 		= express()
var gi 			= require(`gitignore`);

app.set('view engine', 'ejs');



app.get('/', function (req, res) {
  res.render("home");
})

app.listen(3000, function(){
	console.log("+++++++++++++UP and RUNNING+++++++++++++")
})	