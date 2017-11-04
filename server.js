//ROLE OF THE SERVER FILE
// ===========================================================
//The purpose of the server is to: PROVIDE data (and logic to manipulate that data) 
//in way that is LIVE and ACCESSBILE on Node.js


// Dependencies
// ===========================================================
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");

var app = express(); //to follow the docs est in the npm express.
var urlencoderParser = bodyParser.urlencoded({ extended: true }); // create application/x-www-form-urlencoded parser

var PORT = process.env.PORT || 3600;


// Routes
// =========================================================== 
 app.use(bodyParser.json({ type: "application/*+json"})) //use to parse divffernt custom JSON types AS "json"
 app.use(bodyParser.raw({ type: "application/vnd.custom-type"})) //use to parse a custom item into a "Buffer"
 app.use(bodyParser.text({ type: "text/html"})) //use to parse an HTML body into a string
 app.use(urlencoderParser) //SEE ABOVE...

// // POST "root" gets urlencoded bodies...
// app.post('/', urlencoderParser, function (request, ressult) {
//   if (!request.body) return result.sendStatus(400)
//   result.send('Welcome, ' + request.body.username)
// })
 
// // POST /api/users gets JSON bodies...
// app.post('/app/public/results', bodyParser.json(), function (req, res) {
//   if (!req.body) return res.sendStatus(400) 
//   res.send("Hello, this is the post for friends-results page...")
// })


// LOCAL REQUIREs (local files to require on over...)
// =========================================================== 
require("./app/routing/apiRoutes.js")(app); // this MUST come BEFORE the html routes, otherwise this get routes is funneled intot he catch all "get" route in the htmlRoutes file, && MAKE SURE to pass in the "(APP)" PARAMETER....
require("./app/routing/htmlRoutes.js")(app); //IT IS CRITICAL to REMEMBER to INCLUDE the "app" parameter with this require function && this MUST come SECOND (read above)!!!!!

// Listener
// ===========================================================
app.listen(PORT, function() {
	console.log("You are listening on PORT: " + PORT);
})
//app.listen(3000)  --->>>> THIS IS THE BASIC version of the app.listen code ABOVE.
	// This just instructs the app to listen, but the following code actually displays a message in node
	// telling the developer which port is the app is listning to/being run on...


// Console Testing
// ===========================================================
// app.get('/', function (req, res) { //DEFAULT RESPONSE ON THE HOME PAGE.
//   res.send('Hello World')
// })