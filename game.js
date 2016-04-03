
var c, ctx;
var GAME_THYME = 6 ;
var thymerInterval;
var playing = false;
var count = 0;
var total_thyme = 100;

var timer = function timer() {
	GAME_THYME--; 
	document.getElementById('timer').innerHTML = "Time Left: " + GAME_THYME;
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
	$('#timer').html('');
	$('#thymer').html('');
};

$(window).keyup(function (e) {
  if (e.keyCode === 32 || e.which === 32) {
    e.preventDefault()
    var keyCode = e.keyCode;
	  if(keyCode === 32 && playing) {
	  	if (count === 0) {
	  		timer();
			thymerInterval = setInterval(timer, 1000);
	  	}
	  	count++;
	  	$("#thymer").html("Thyme earned: " + count);
	  } 
  }
});

$(window).keydown(function (e) {
	if (e.keyCode === 32 || e.which === 32) {
	    e.preventDefault();
	}
});

var openGameScreen = function openGameScreen() {

	var WIDTH = window.innerWidth,
      	HEIGHT = window.innerHeight;

     c = $("#canvas"); 
     ctx = c[0].getContext('2d');

     ctx.canvas.width = WIDTH;
     ctx.canvas.height = HEIGHT;

	$("#canvas").css("display", "block");
	$("#thymer").html("Thyme Spent: 0");

	make_thyme();
};

var play  = function play() {
	closeStartScreen();
	openGameScreen();
	playing = true;
};

var make_thyme = function make_thyme() {
	var img = new Image();
	img.onload = function(){
		var thyme_width = img.naturalWidth * 0.3;
		var thyme_height = img.naturalHeight * 0.3;

	    for (var i = 0; i < total_thyme; i++){
	       var thyme_size_scale = Math.random() + 0.3;
			ctx.drawImage(img, 
				Math.floor((Math.random() * window.innerWidth * 0.8) 
					 + window.innerWidth * 0.05),
				Math.floor((Math.random() * window.innerHeight * 0.2) 
					+ window.innerHeight * 0.3),
				thyme_width * thyme_size_scale,
				thyme_height * thyme_size_scale);
	    }
  };
  img.src = 'assets/thyme.png';
};

var change_thyme = function change_thyme() {
	
};

var collect_thyme = function collect_thyme() {

};

var game_over = function game_over() {
	playing = false;
	clearTimeout(thymerInterval);
	GAME_THYME = 6;
	resetStartScreen();
	$('#title').html("Thyme Wasted: " + (total_thyme - count));
	count = 0;
};

