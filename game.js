
var c, ctx;
var GAME_THYME = 11;
var thymerInterval;

var thymer = function thymer() {
	GAME_THYME--; 
	document.getElementById('thymer').innerHTML = GAME_THYME;
	if (GAME_THYME === 0) {
		game_over();
	}
};

var closeStartScreen = function closeStartScreen() {
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
	thymer();
	thymerInterval = setInterval(thymer, 1000);
};

var make_thyme = function make_thyme() {
	
};

var change_thyme = function change_thyme() {
	
};

var game_over = function game_over() {
	clearTimeout(thymerInterval);
	GAME_THYME = 11;
	reset_startScreen();
	$('#game_over').html("Thyme Wasted: ");
};