/*
	Many utility functons here have been learned from the book:
	Foundation HTML5 Animation with JavaScript, by Billy
	Lamberta and Keith Peters.
	
	They help support cross-browser compatibility and older browsers
	that may not be up to the current standard.

*/

/**
	Load the canvas element itself.
*/
var canvas = document.getElementById('game_main');
var context = canvas.getContext('2d');

var food_canvas = document.getElementById('food_canvas');
var food_context = food_canvas.getContext('2d');

var hud_canvas = document.getElementById('hud_canvas');
var hud_context = hud_canvas.getContext('2d');

// Array for all of the items in the game
var game_items = new Array();
var bounced_items = new Array();

var watcher_canvas = document.getElementById('watcher_canvas');
var watcher_context = watcher_canvas.getContext('2d');

/**
	Define the canvas properties.
*/
canvas.width = 480;
food_canvas.width = 480;
hud_canvas.width = 480;
watcher_canvas.width = 480;
canvas.height = 580;  
food_canvas.height = 580;
hud_canvas.height = 580;
watcher_canvas.height = 580;


/**
	Variables for controlling the animation speed of the game loop.
*/
var fps = 66;
var interval = 1000/fps;

var utilities = {}
/**
	Support animating for the game loop in browsers that may not yet
	have implemented 'requestAnimationFrame' for cross-browser compatibility.
*/
if(!window.requestAnimationFrame){
	window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
									window.mozRequestAnimationFrame ||
									window.oRequestAnimationFrame ||
									window.msRequestAnimationFrame ||
									function (callback) {
										return window.setTimeout(callback, 1000/60);
									});
}


/* Stops right click bringing up the menu on canvas right-clicks. */
$('body').on('contextmenu', '#game_main', function(e){ return false; });
$('body').on('contextmenu', '#food_canvas', function(e){ return false; });
$('body').on('contextmenu', '#hud_canvas', function(e){ return false; });

/* JQuery script to detect mouse clicks! */
$('#hud_canvas').mousedown(function(event) {
    if(event.which == 1){
        left_paw_click();
    } else if(event.which == 3){
        right_paw_click();
    }
});

/**
	Support for getting the position of the mouse upon an element
	passed as a parameter. Not all browsers support 'mousePos'
	with the mouse listener.
*/	
utilities.captureMouse = function (element) {
	var mouse = {x: 0, y:0};
	
	element.addEventListener('mousemove', function (event) {
		var x, y;
		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
			}
			x -= element.offsetLeft;
			y -= element.offsetTop;
			
			mouse.x = x;
			mouse.y = y;
			}, false);
			
			return mouse;
		};
