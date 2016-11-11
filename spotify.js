$(document).ready(function(){

    function queryTrack(trackEntered){

        $("#trackView").empty();
        
        var track = $("#track-input").val().trim();
        var queryURL = "https://api.spotify.com/v1/search?q=" + track + "&type=track&limit=1";   

        $.ajax({url: queryURL, method: "GET"}).done(function(response) {    

            var trackDiv = $("<div>");
            trackDiv.addClass("trackHolder");
            
            var trackImage = $("<img>");
            trackImage.attr("src", response.tracks.items[0].album.images[0].url);
            trackImage.attr("class", "jpg");
            trackDiv.append(trackImage);

            var trackAudio = $("<audio>");
            trackAudio.attr("controls", true);
            trackAudio.attr("src", response.tracks.items[0].preview_url)
            trackDiv.append(trackAudio);

            var title = response.tracks.items[0].name;
            var trackTitle = $("<h3>").text("Title: " + title);
            trackDiv.append(trackTitle);

            var artist = response.tracks.items[0].artists[0].name;
            var trackArtist = $("<h3>").text("Artist: " + artist);
            trackDiv.append(trackArtist);

            $("#trackView").append(trackDiv);
                
        });
    }

    $("#addTrack").on("click", function(){

        var track = $("#track-input").val().trim();

        queryTrack(track);

        return false;
    });
});
