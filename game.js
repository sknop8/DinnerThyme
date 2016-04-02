
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

var resetStartScreen = function openStartScreen() {
	$("#title").css("display", "block");
	$("#play_button").css("display", "block");
	$("#canvas").css("display", "none");
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
	var img = new Image();
	img.onload = function(){
		var thyme_width = img.naturalWidth * 0.5;
		var thyme_height = img.naturalHeight * 0.5;

	    for (var i=0;i<20;i++){
	      for (var j=0;j<5;j++){
	        ctx.drawImage(img,
	        	j*thyme_width,
	        	i*thyme_height,
	        	thyme_width,
	        	thyme_height);
	      }
	    }
  };
  img.src = 'assets/thyme.png';
};

var change_thyme = function change_thyme() {
	
};

var game_over = function game_over() {
	clearTimeout(thymerInterval);
	GAME_THYME = 11;
	resetStartScreen();
	$('#game_over').html("Thyme Wasted: ");
};