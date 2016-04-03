
var c, ctx;
var GAME_THYME = 11;
var thymerInterval;
var playing = false;
var count = 0;

var total_dishes = 12;
var total_thyme = total_dishes * 10; 
var thymes = new Array();

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
	  	thymes.shift();
	  	draw_thymes();
	  	unlocked_dishes = count/10;
	  	for (var i = 1; i < (total_dishes + 1); i++) {
	  		if (i === unlocked_dishes) {
	  			$("#dish_" + (i-1)).css("filter", "blur(0px) grayscale(0%)");
	  			$("#dish_" + (i-1)).css("-webkit-filter", "blur(0px) grayscale(0%)");
	  		}
	  	}
	  	$("#thymer").html("Thyme spent: " + count);
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
     ctx.canvas.height = HEIGHT * 0.9;

	$("#canvas").css("display", "block");
	$("#thyme_dishes").css("display", "block");
	$("#thymer").html("Thyme Spent: 0");

	make_thyme();
	put_dishes();
};

var play  = function play() {
	closeStartScreen();
	openGameScreen();
	playing = true;
};

var make_thyme = function make_thyme() {
	thymes = new Array();
	var img = new Image();
	img.onload = function(){
		var thyme_width = img.naturalWidth * 0.3;
		var thyme_height = img.naturalHeight * 0.3;

	    for (var i = 0; i < total_thyme; i++){
	       var thyme_size_scale = Math.random() + 0.3;
	       var new_thyme = {
	       	"x": window.innerWidth * 0.08 + 
			(1.0 * i)/(window.innerWidth * 1.2/(total_thyme-3)) * (thyme_width),
			"y": window.innerHeight * 0.5 +                                   
				window.innerHeight * Math.random()/3 - thyme_height * thyme_size_scale,
			"width" : thyme_width * thyme_size_scale,
			"height" : thyme_height * thyme_size_scale
	       }
	       thymes.push(new_thyme);
	       ctx.drawImage(img,
				thymes[i].x,
				thymes[i].y,
				thymes[i].width,
				thymes[i].height
			);
			// ctx.drawImage(img, 
			// 	window.innerWidth * 0.08 + 
			// 	(1.0 * i)/(window.innerWidth * 1.2/(total_thyme-3)) * (thyme_width),
			// 	window.innerHeight * 0.5 +                                   
			// 	window.innerHeight * Math.random()/3 - thyme_height * thyme_size_scale,
			// 	thyme_width * thyme_size_scale,
			// 	thyme_height * thyme_size_scale);
	    }
	    draw_thymes();
  };
  img.src = 'assets/thyme.png';
  
};

var draw_thymes = function draw_thymes(){
	var img = new Image();
	ctx.clearRect(0, 0, ctx.canvas.width * (total_thyme * 1.0 - thymes.length) /total_thyme, 
		ctx.canvas.height);
	// img.onload = function() {
	// 	var thyme_width = img.naturalWidth * 0.3;
	// 	var thyme_height = img.naturalHeight * 0.3;
	// 	for (var i = 0; i < thymes.length; i++) {
	// 		ctx.drawImage(img,
	// 			thymes[i].x,
	// 			thymes[i].y,
	// 			thymes[i].width,
	// 			thymes[i].height
	// 		);
	// 	}
	// }
	img.src = 'assets/thyme.png';
}

var put_dishes = function put_dishes() {
	$("#thyme_dishes").empty();
	for (var i = 0; i < total_dishes; i++) {
		$("#thyme_dishes").append("<img src = 'assets/dishes_square/"
			+ i + ".png' class = 'thyme_dish' id = 'dish_" + i
			+ "'>");
	}
}

var change_thyme = function change_thyme() {
	
};

var collect_thyme = function collect_thyme() {

};

var game_over = function game_over() {
	playing = false;
	clearTimeout(thymerInterval);
	GAME_THYME = 11;
	resetStartScreen();
	$('#title').html("Thyme Wasted: " + (total_thyme - count));
	count = 0;
};

