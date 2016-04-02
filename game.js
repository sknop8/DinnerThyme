var GAME_TIME = 0;
var c, ctx;

var timer = function timer() {
	GAME_TIME++; 
	document.getElementById('thymer').innerHTML = GAME_TIME;
};


var closeStartScreen = function closeStartScreen() {
	$("#title").css("display", "none");
	$("#play_button").css("display", "none");
};

var openGameScreen = function openGameScreen() {

	var WIDTH = window.innerWidth,
      	HEIGHT = window.innerHeight;

     c = $("#canvas"); 
     ctx = c[0].getContext('2d');

     ctx.canvas.width = WIDTH;
     ctx.canvas.height = HEIGHT;

	$("#canvas").css("display", "block");

	make_thyme();
}

var play  = function play() {
	closeStartScreen();
	openGameScreen();
	timer();
	setInterval(timer, 1000);
};

var make_thyme = function make_thyme() {
	
};

var change_thyme = function change_thyme() {

};