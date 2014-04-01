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

/**
	Define the canvas properties.
*/
canvas.width = 480;
canvas.height = 580;  


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
