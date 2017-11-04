
//ROLE OF THE ROUTES FILE(S):
// ===========================================================
// We CREATE ROUTES between our server and (web)client(s) in order to MAKE the DATA/LOGIC on the SERVER accessible,
// ANNNND
// we NEED to call AJAX ON THOSE ROUTES to MAKE and ACCESS CHANGES to the Server Data/Logi and PRESENT these changes
// to the Web Client, and ultimately, REFLECT these changes for the client/front-end side.


// Console Testing
// ===========================================================
console.log("NODE USER: You're inside the apiRoutes.js file...");


// Dependencies
// ===========================================================
var express = require("express");
var path = require("path");
var friendsList = require("../data/friends.js")


// Global Vars
// =========================================================== 
var mostAlike = [];

// Routes
// =========================================================== 
module.exports = function (app) {
	app.get("/api/friends", function(request, result) {
		result.json(friendsList); //REMEMBER TO USE THE JSON here, as this is a RAW JS file, that we sould like to view in a stringified JSON model.
	})	

	app.post("/api/friends", function(request, result) {
		mostAlike = [{
			name:"",
			photo: "",
			TotalFriendDiff: 100000 //large num that is default --> ensures that any entered result to beat this data...
		}];

		console.log("\nHey Node User, this is the current request.body: ");
		console.log(request.body); //help begin the diagnosis of the rquest body, and thus how to navigate through the issue.
		console.log("\n");

		var friendDiff = 0;		
		var newFriendList = request.body; //current user's recent input...
		var newFriendScores = newFriendList.scores; //this will target ONLY the ARRAY of number values responding to the Survey Q's. 
		
		function compareFriends() {
			for (var i = 0; i < friendsList.length; i++) {
				if (friendsList[i] !== newFriendList) { //this doesn't allow the list to be compared agains itself....
					console.log("This is friendsList[i]: ");
					console.log(friendsList[i]);
					console.log("\n");

					for (var n = 0; n < friendsList[i].scores.length; n++) {
						console.log("This is friendsList[i].scores[n]: " + friendsList[i].scores[n]);
						console.log("This is newFriendScores[n]: " + newFriendScores[n]);	
						
						if (friendsList[i].scores[n] === newFriendScores[n]) { //using the same var "n" as the number to track through the "newFriendScores" Array, ensures that the same question values are being compared... (thus not comared OUT OF order.);
							console.log("there was no difference");
						}
						else  {
							friendDiff += Math.abs(parseInt(friendsList[i].scores[n]) - parseInt(newFriendScores[n]));
							console.log("difference: " + friendDiff);
						}
					}
					console.log(friendDiff);
					console.log("\n");
					//
					if (friendDiff < mostAlike[0].TotalFriendDiff) { //new MATCH!!!!!
						mostAlike = [];						
						mostAlike.push(friendsList[i]);
						console.log("Here is your New Best MATE: ");
						console.log(friendsList[i]);
						console.log("\n\n");
					}
					else if (friendDiff === mostAlike[0].TotalFriendDiff) { //TIED Match....
						console.log("There's a tie! See you match: ");
						mostAlike.push(friendsList[i]);
					}
					else {
						return console.log("The previous match is still the best...");
					}
				}
				else { //if the friendsList[i] choice ended up being the same user as the newFriendsList... aka to prevent the user from ever matching his/her -self
					return compareFriends();
				}
			};
		};
		compareFriends(); //immediately invoked function....

		console.log("The final best mate of the current match-up is.... ");
		console.log(mostAlike);
		console.log("\n");

		friendsList.push(newFriendList);
		console.log("This is the NEW full list of friends: ");
		console.log(friendsList);
		console.log("\n");

		result.json(mostAlike); //This returns the result in a JSON format, to be dsiplayed on the /api/friends page. 
		//...is it neccessary for the vars/objs to be in this format for access to it's content from other pages??, such as the html docs and data display functionalities???
		
		console.log("mostAlike in the JSON format: ");
		console.log(mostAlike); //testing.. this SHOULD display as a JSON Object (in the raw stringified format)

	});//end of /api/friends app.post

	app.post("/results", function(request, result) {
		console.log("Node User, this is the mostAlike var, from the /results App.Post: ");
		//result.parse(mostAlike); --> this is NOT pulliung the JSON verions of the mostAlike, as it is pulling in the Global Variable above, whidh was last pusehd as an array, not JSON-stringified.....
		console.log(mostAlike);
	});//end of /results app.post"

}//end of module.exports
