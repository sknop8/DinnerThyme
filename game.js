var GAME_TIME = 11;

var timer = function timer() {
	GAME_TIME--; 
	document.getElementById('timer').innerHTML = GAME_TIME;
};


var close_startScreen = function close_startScreen() {
	$("#title").css("display", "none");
	$("#play_button").css("display", "none");
};

var play  = function play() {
	close_startScreen();
	timer();
	setInterval(timer, 1000);
};