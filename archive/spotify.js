$(document).ready(function(){
    // stores the list of keys, tracks, up votes, and down votes for each track that is copied from the database
    // var trackList = [];

    function queryTrack(trackEntered){
        // clear HTML section for these IDs to make room for displaying new track info
        $("#albumCover").empty();
        $("#soundBar").empty();
        $("#titleName").empty();
        $("#songName").empty();
        $("#artistName").empty();
        $("#trackView").empty();
        
        var track = $("#track-input").val().trim();
        var queryURL = "https://api.spotify.com/v1/search?q=" + track + "&type=track&limit=1";   

        $.ajax({url: queryURL, method: "GET"}).done(function(response) {    

            var trackDiv = $("<div>");
            trackDiv.addClass("trackHolder");
            
            var trackImage = $("<img>");
            trackImage.attr("src", response.tracks.items[0].album.images[0].url);
            trackImage.attr("class", "jpg");
            $("#albumCover").append(trackImage);

            var trackAudio = $("<audio>");
            trackAudio.attr("controls", true);
            trackAudio.attr("src", response.tracks.items[0].preview_url)
            $("#soundBar").append(trackAudio);

            var title = response.tracks.items[0].name;
            var artist = response.tracks.items[0].artists[0].name;
            var trackTitle = $("<p>").text(title + "  -  " + artist);
            $("#titleName").append(trackTitle);

            var title = response.tracks.items[0].name;
            var trackTitle = $("<p>").text(title);
            $("#songName").append(trackTitle);

            var artist = response.tracks.items[0].artists[0].name;
            var trackArtist = $("<p>").text(artist);
            $("#artistName").append(trackArtist);
    
            // parse audio from object into an iframe
            var playTrack = $("<iframe>");
            playTrack.attr("src", response.tracks.items[0].external_urls.spotify);
            playTrack.attr("width", "100");
            playTrack.attr("height", "130");
            playTrack.attr("class", "play");
            playTrack.attr("scrolling", "no");
            $("#trackView").append(playTrack);
                    
        });
    }

    $("#addTrack").on("click", function(){

        var track = $("#track-input").val().trim();

        queryTrack(track);

        $("#track-input").val("");

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
