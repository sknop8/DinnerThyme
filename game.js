
var c, ctx;
var GAME_THYME = 11;
var thymerInterval;
var playing = false;
var count = 0;

var total_dishes = 12;
var total_thyme = total_dishes * 10; 
var thymes = new Array();
var thyme_recipes = new Array();

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
	$('#play_button').html('Try Again!');
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
	  	chop_thymes();
	  	unlocked_dishes = count/10;

	  	//unlock dishes
	  	for (var i = 1; i < (total_dishes + 1); i++) {
	  		if (i === unlocked_dishes) {
	  			$("#dish_" + (i-1)).css("filter", "blur(0px) grayscale(0%)");
	  			$("#dish_" + (i-1)).css("-webkit-filter", "blur(0px) grayscale(0%)");
	  			$("#dish_" + (i-1)).addClass("unlocked");
	  			$("#recipe_" + (i-1)).attr('href', thyme_recipes[i-1].url);
	  		}
	  	}      
	  	$("#thymer").html("Thyme left: " + (total_thyme - count));
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
	$("#thank_you").css("display", "none");
	$("#thymer").html("Thyme Left: " + total_thyme);

	make_thyme();
	put_dishes();
};

var play  = function play() {
	load_recipes();
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
	       var thyme_size_scale = Math.random() + 0.5;
	       var new_thyme = {
	       	"x": window.innerWidth * 0.07 + 
			(1.0 * i)/(window.innerWidth * 1.5 /(total_thyme-3)) * (thyme_width),
			"y": window.innerHeight * 0.45 +                                   
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
	    }
  };
  img.src = 'assets/thymes.png';
  
};

var chop_thymes = function chop_thymes(){
	var img = new Image();
	ctx.clearRect(0, 0, window.innerWidth * 0.08 + 
		ctx.canvas.width * 0.8 * (total_thyme * 1.0 - thymes.length) /total_thyme, 
		ctx.canvas.height);
}

var put_dishes = function put_dishes() {
	$("#thyme_dishes").empty();
	for (var i = 0; i < total_dishes; i++) {
		$("#thyme_dishes").append("<a id = 'recipe_" + i + "' target='_blank'><img src = 'assets/dishes_square/"
			+ i + ".png' class = 'thyme_dish' id = 'dish_" + i
			+ "'></a>");
	}
}

var load_recipes = function load_recipes() {
	$.getJSON("thyme_dishes.json", function(json) {
   		thyme_recipes = json;
	});
}

var game_over = function game_over() {
	playing = false;
	clearTimeout(thymerInterval);
	GAME_THYME = 11;
	resetStartScreen();
	var percent = 100 * count/total_thyme;
	$('#title').html("Thyme Saved: " + percent.toFixed(2) + "%");
	count = 0;
};

