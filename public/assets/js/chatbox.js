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
$("#addMessage").click(function() {
	event.preventDefault();

	console.log("add message");
});