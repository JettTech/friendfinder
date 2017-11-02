//ROLE OF THE ROUTES FILE(S):
// ===========================================================
// We CREATE ROUTES between our server and (web)client(s) in order to MAKE the DATA/LOGIC on the SERVER accessible,
// ANNNND
// we NEED to call AJAX ON THOSE ROUTES to MAKE and ACCESS CHANGES to the Server Data/Logi and PRESENT these changes
// to the Web Client, and ultimately, REFLECT these changes for the client/front-end side.


// Console Testing
// ===========================================================
console.log("NODE USER: You're inside the htmlRoutes.js file...");

// Dependencies
// ===========================================================
var express = require("express");
var path = require("path");

// Routes
// =========================================================== 
module.exports = function (app) {//app here REFERS to EXPRESS NPM...
	//app.use(express.static(path.resolve('/../assets')));
	app.use(express.static("assets"));

	app.get("/survey", function(request, result) {
		result.sendFile(path.join(__dirname + "/../public/survey.html")); //if the user accesses the app + "/survey",... then get the file "survey.html" through the "/../public/surve.html" path.
	});

	app.get("/results", function(request, result) {
		result.sendFile(path.join(__dirname + "/../public/friends-results.html")); //if the user accesses the app + "/results",... then get the file "survey.html" through the "/../public/surve.html" path.
	});

	app.use(function(request, result) {
		result.sendFile(path.join(__dirname + "/../public/home.html")); //This structure is THE way to assign the default behavior for the app to direct to the home page, UNLESS another specified path (as written above), is established.
	}); //This MUST BE the last choice among the path list, as is is order dependant.. if the path does not satisfy the other paths, (only) THEN it wil address to the home page.

}

//app.get('/', function (req, res) {
 // res.send('Hello World') //NOTICE that can JUST send out text (with result.send), OR can send out an entire file to display (through result.sendFile - as seen above). 
//})