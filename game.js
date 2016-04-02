var GAME_TIME = 0;

var startTime = function startTime() {
	GAME_TIME++; 
	document.getElementById('timer').innerHTML = GAME_TIME;
}

function play() {
	startTime();
	setTimeout(startTime, 1000);
}