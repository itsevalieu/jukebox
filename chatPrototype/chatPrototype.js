 // Initialize Firebase
 var config = {
 	apiKey: "AIzaSyC_1MMEsaEye6gcySZbEtFMPHMPOQwQW1o",
 	authDomain: "spotifyjukebox-afcf8.firebaseapp.com",
 	databaseURL: "https://spotifyjukebox-afcf8.firebaseio.com",
 	storageBucket: "spotifyjukebox-afcf8.appspot.com",
 	messagingSenderId: "603683261992"
 };
 firebase.initializeApp(config);
 var database = firebase.database();
 $(document).ready(function () {
	 var userName = "";
	 var userLogIn = "";
 	//Modal Login for Chat Functions and Firebase User Creation
 	$("#loginButton").on("click", function () {
 		"use strict";
 		userLogIn = $("#userId").val().trim();
 		userName = $("#userName").val().trim();
 		writeUserData(userLogIn, userName);
 		$("#userId").val("");
 		$("#userName").val("");
 		$("#myModal").modal("hide");
 		return false;
 	});

 	//Chat Send Button Functionality
 	$("#userSend").on("click", function () {
 		"use strict";
 		console.log("You clicked the Send Button.");
		//this functionality is repeated below - break it into a function
 		var input = $("#userChatInput").val().trim();
 		console.log(input);
 		chatSubmit(input);
 		$("#mainWindow").append(userName + ": " + input + "<br>");
 		$("#userChatInput").val("");
 		return false;
 	});
	 
	//Catches userChatInput if 'Enter' key is pressed instead of 'Send' button
 	$(document).keypress(function (e) {
 		"use strict";
 		if (e.which === 13) {
 			console.log("You hit the enter button.");
			//this functionality is repeated above - break it into a function
 			var input = $("#userChatInput").val().trim();
 			console.log(input);
			chatSubmit(input);
 			$("#mainWindow").append(userName + ": " + input + "<br>");
 			$("#userChatInput").val("");
 			return false;
 		}
 	});

 });

//writes user login data to firebase database
 function writeUserData(userId, name) {
 	"use strict";
 	firebase.database().ref('users/' + userId).set({
 		username: name,

 	});
 }

//
 function chatSubmit(userInput) {
 	"use strict";
 	firebase.database().ref('chatlog/').push(userInput);
 }

 function pullChatLog() {
 	firebase.database(snapshot).on("value", function () {
 		"use strict";
 	});
 }
