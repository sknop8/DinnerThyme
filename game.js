var GAME_TIME = 0;

var startTime = function startTime() {
	GAME_TIME++; 
	document.getElementById('timer').innerHTML = GAME_TIME;
}

function play() {
	close_startScreen();
	startTime();
	setTimeout(startTime, 100);
}

function close_startScreen() {
	$("#title").css("display", "none");
	$("#play_button").css("display", "none");
}