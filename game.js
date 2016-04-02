var GAME_THYME = 3;
var thymerInterval;

var thymer = function thymer() {
	GAME_THYME--; 
	document.getElementById('thymer').innerHTML = GAME_THYME;
	if (GAME_THYME === 0) {
		game_over();
	}
};

var close_startScreen = function close_startScreen() {
	$("#title").css("display", "none");
	$("#play_button").css("display", "none");
	$("#game_over").html("");
};

var reset_startScreen = function open_startScreen() {
	$("#title").css("display", "block");
	$("#play_button").css("display", "block");
	$('#play_button').html('Cook Again!');
	$('#thymer').html('');
};

var play  = function play() {
	close_startScreen();
	thymer();
	thymerInterval = setInterval(thymer, 1000);
};

var game_over = function game_over() {
	clearTimeout(thymerInterval);
	GAME_THYME = 11;
	reset_startScreen();
	$('#game_over').html("Thyme Wasted: ");
};