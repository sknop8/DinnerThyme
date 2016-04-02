var GAME_TIME = 0;

var timer = function timer() {
	GAME_TIME++; 
	document.getElementById('timer').innerHTML = GAME_TIME;
};

var play  = function play() {
	startTime();
	setInterval(timer, 1000);
};