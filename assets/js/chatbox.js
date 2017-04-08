$(document).ready(function(){

	$(".hidden").hide();
	$("#close-chatbox").hide();

	$("#open-chatbox").click(function() {
		$("#open-chatbox").hide();
		$(".hidden").show();
		$("#close-chatbox").show();

	});	

	$("#close-chatbox").click(function() {
		$("#close-chatbox").hide();
		$(".hidden").hide();
		$("#open-chatbox").show();
	});

	$("#addTrack").click(function() {
		event.preventDefault();

		console.log("add track");
	});

	// Action on play-pause buttons can be added here (should be a wholesome function rather than annonymous)
	$('#music-bars span').each(function(i) {
		equalizer($(this));
	});

});

// $("#addMessage").click(function() {
// 	event.preventDefault();

// 	console.log("add message");
// });

// Equalizer
function equalizer(bar) {
	// Syntax: Math.random() * (max-min = range) + min;
	// My bars will be at least 70px, and at most 170px tall
	var height = Math.random() * 50 + 30;
	// Any timing would do the trick, mine is height times 7.5 to get a speedy yet bouncy vibe
	var timing = height * 7.5;
	// If you need to align them on a baseline, just remove this line and also the "marginTop: marg" from the "animate"
	var marg = (75 - height) / 2;
  	bar.animate({
		height: height,
		marginTop: marg
  	}, timing, function() {
    	equalizer($(this));
  	});
}
