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
 	"use strict";
 	pullChatLog();
 	var userName = "Anonymous";
 	var input = "";
	 
 	//Modal Login for Chat Functions and Firebase User Creation
 	$("#loginButton").on("click", function () {
 		userName = setUserName();
 		return false;
 	});

 	//Chat Send Button Functionality
 	$("#userSend").on("click", function () {
 		console.log("You clicked the Send Button.");
 		input = $("#userChatInput").val().trim();
 		pullChatInput(input, userName);
 		return false;
 	});

 	//Catches userChatInput if 'Enter' key is pressed instead of 'Send' button
 	$(document).keypress(function (e) {
 		if (e.which === 13) {
 			console.log("You hit the enter button.");
 			input = $("#userChatInput").val().trim();
 			pullChatInput(input, userName);
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
 	"use strict";
 	database.ref().on("value", function (snapshot) {
 		$("#mainWindow").empty();
 		var chatHistory = snapshot.child("chatlog").val();
 		$.each(chatHistory, function (i, l) {
 			console.log(l);
 			$("#mainWindow").append("<p>" + l + "</p>");
 		});
 		//console.log(chatHistory);
 		$("#mainWindow").scrollTop($("#mainWindow")[0].scrollHeight);

 	});
 }

 function setUserName(userName) {
 	"use strict";
 	var userLogIn = $("#userId").val().trim();
 	userName = $("#userName").val().trim();
 	writeUserData(userLogIn, userName);
 	$("#userId").val("");
 	$("#userName").val("");
 	$("#myModal").modal("hide");
	 console.log("User name has been set to " + userName);
	 return userName;
 }

 function pullChatInput(input, userName) {
 	"use strict";
 	if ($("#myModal").attr("style") === "display:block") {
 		console.log("Modal is open");
 	} else {
 		input = $("#userChatInput").val().trim();
 		if (input === "") {
 			console.log("You didn't enter anything");
 		} else {
 			var entry = userName + ": " + input;
 			console.log(entry);
 			chatSubmit(entry);
 			$("#userChatInput").val("");
 		}
 	}
 }
