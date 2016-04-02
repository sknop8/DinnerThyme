var GAME_THYME = 11;
var thymerInterval;

var thymer = function thymer() {
	GAME_THYME--; 
	document.getElementById('thymer').innerHTML = GAME_THYME;
	if (GAME_THYME === 0) {
		game_over();
	}
};

var close_startScreen = function close_startScreen() {
	$("#title").css("display", "none");
	$("#play_button").css("display", "none");
};

var play  = function play() {
	close_startScreen();
	thymer();
	thymerInterval = setInterval(thymer, 1000);
};

var game_over = function game_over() {
	clearTimeout(thymerInterval);
	GAME_THYME = 11;
	var div = $('<div><div/>').html("Thyme Wasted: ");
	$(div).attr('id', 'game_over');
	$('body').append(div);
};