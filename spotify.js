$(document).ready(function(){

// establish link to the database 
var config = {
    apiKey: "AIzaSyCCFSxU2igdVBU_credabLSalOMiBrP7HU",
    authDomain: "spotify-54c8e.firebaseapp.com",
    databaseURL: "https://spotify-54c8e.firebaseio.com",
    storageBucket: "spotify-54c8e.appspot.com",
    messagingSenderId: "776346113193"
};
firebase.initializeApp(config);

// create local variable to reference the database
var database = firebase.database();

// stores the list of keys, tracks, up votes, and down votes for each track that is copied from the database
var trackList = [];
var trackKeyList = [];
var thumbsUpList = [];
var thumbsDownList = [];
var thumbsUpCount = 0;
var thumbsDownCount = 0;
var thiscount = 0;

// a random number is chosen for the next selected track when page is loaded or user pushes button
var randomNumber;

// function to make API calls to Spotify based on the track entered
function queryTrack(trackEntered){

     // clear HTML section for these IDs to make room for displaying new track info
    $("#albumCover").empty();
    $("#soundBar").empty();
    $("#songName").empty();
    $("#artistName").empty();
    $("#trackView").empty();

    // store Spotify API call which takes in a track name and limit the results to 1 
    var track = trackEntered;
    var queryURL = "https://api.spotify.com/v1/search?q=" + track + "&type=track&limit=1"; 

    // obtain an object response from Spotify API call
    $.ajax({url: queryURL, method: "GET"}).done(function(response) {    

        // div to hold individual pieces together
        var trackDiv = $("<div>");
        trackDiv.addClass("trackHolder");

        // parse image from object
        var trackImage = $("<img>");
        trackImage.attr("src", response.tracks.items[0].album.images[0].url);
        trackImage.attr("class", "jpg");
        $("#albumCover").append(trackImage);

        // parse audio from object
        var trackAudio = $("<audio>");
        trackAudio.attr("controls", true);
        trackAudio.attr("src", response.tracks.items[0].preview_url)
        $("#soundBar").append(trackAudio);

        // parse title from object
        var title = response.tracks.items[0].name;
        var trackTitle = $("<h3>").text("Title: " + title);
        $("#songName").append(trackTitle);

        // parse artist from object
        var artist = response.tracks.items[0].artists[0].name;
        var trackArtist = $("<h3>").text("Artist: " + artist);
        $("#artistName").append(trackArtist);

        // parse audio from object into an iframe
        var playTrack = $("<iframe>");
        playTrack.attr("src", response.tracks.items[0].external_urls.spotify);
        playTrack.attr("width", "300");
        playTrack.attr("height", "380");
        playTrack.attr("class", "play");
        playTrack.attr("scrolling", "no");
        $("#trackView").append(playTrack);

        // make a call to function with track title to display purchase link and price
        purchaseTrack(title);    
    });
}

// function to make API calls Apple Music based on the track entered
function purchaseTrack(tTitle, tArtist){
        
    // store Apple Music API call which takes in a track name and limit the results to 1
    var iTunesTitle = tTitle;
    var queryURLItunes = "https://itunes.apple.com/search?term=" + iTunesTitle + "&limit=1";

    // obtain an object response from Apple Music API call
    $.ajax({url: queryURLItunes, jsonp: "callback", dataType: "jsonp", method: "GET"}).done(function(response1){

        // div to hold individual pieces together
        var iTunesTitleDiv = $("<div>");
        iTunesTitleDiv.addClass("iTunesTitleHolder");  

        // parse link to purchase track from object
        var link = response1.results[0].trackViewUrl;
        var trackLink = $("<a>").text("Purchase Link: " + link);
        trackLink.attr("href", link);
        iTunesTitleDiv.append(trackLink);   

        // parse track cost from object
        var cost = response1.results[0].trackPrice;
        var trackCost = $("<h3>").text("Price: " + cost);
        iTunesTitleDiv.append(trackCost);   

        // put div into html
        $("#trackView").append(iTunesTitleDiv);  
    });
}

// function to add a new track is triggered when user inputs 
$("#addTrack").on("click", function(){

    // pull track name from html and initialize data
    var tName = $("#track-input").val().trim();
    var userLike = 0;
    var userDislike = 0; 
    queryTrack(tName);
    
    // combine data attributes in an object
    var newTrack = {
        name: tName,
        thumbsUp: userLike,
        thumbsDown: userDislike
    }

    // push object to database
    database.ref().push(newTrack);

    // clear html for next user input
    $("#track-input").val("");

    // increment track count in database by 1
    thiscount++;
    
    // set track count
    database.ref().set({
        thiscount: thiscount
    });
    
    // since this is a form
    return false;

});

// function that generates a call to go to next random track
$("#nextTrack").on("click", function(){
    randomNumber = Math.floor(Math.random() * trackList.length); 
    queryTrack(trackList[randomNumber]);
});

// function executes when page is loaded or a new track is added
database.ref().on("value", function(childSnapshot){
    thiscount = childSnapshot.val().thiscount;

    // obtain a snapshot of the data in the database and store it locally
    var childSnapshotObj = childSnapshot.val();

    // parse each individual track from object into an array
    for(var key in childSnapshotObj){

        // for each child that has a key put it in a separate index
        if(childSnapshotObj.hasOwnProperty(key)){
            trackList.push(childSnapshotObj[key].name)
        }
    }

    // generate a random number based on length of array
    randomNumber = Math.floor(Math.random() * trackList.length); 

    // call function to query a random track to display on page
    queryTrack(trackList[randomNumber]);
});

});