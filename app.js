const express = require('express')
const app = express()

const runner = require('gitlab-runner'), Client = runner.Client, Server = runner.Server

new Server().start()            // starts a server at port 8080
//new Server(9876).start()        // starts a server at port 9876


var gi = require(`gitignore`);


// const api = new Gitlab({
  // token: 'n9gUZzJUTpizLyDymHUH',
// });




app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, function(){
	console.log("+++++++++++++UP and RUNNING+++++++++++++")
})	