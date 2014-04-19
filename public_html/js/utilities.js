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
    Code from:
    Foundation HTML5 Animation with JavaScript, by Billy
    Lamberta and Keith Peters.
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
    // Check that the user isn't just clicking to turn the audio off.
    if(mousePos.y > hud_canvas.height - 30 
        && mousePos.x > hud_canvas.width - 30){
        audio_handler.toggle_audio();
    } else if(mousePos.y > hud_canvas.height - 60 
        && mousePos.y < hud_canvas.height - 30
        && mousePos.x > hud_canvas.width - 30){
        audio_handler.toggle_sfx();
    } else {
        if(!controller.game_over){
            if(controller.game_running){
                game_mouse(event);
            } else if(!controller.on_menu_screen){
                if(hud_object.start_button_hover == 1){
                    hud_object.start_button_hover = 0;
                    hud_object.menu_screen_option = 0;
                    controller.start_game();
                    audio_handler.play_effect(0);
                } else if(hud_object.highscores_button_hover == 1){
                    hud_object.highscores_button_hover = 0;
                    hud_object.menu_screen_option = 1;
                    controller.on_menu_screen = true;
                    audio_handler.play_effect(0);
                } else if(hud_object.help_menu_button_hover == 1){
                    hud_object.help_menu_button_hover = 0;
                    hud_object.menu_screen_option = 2;
                    controller.on_menu_screen = true;
                    audio_handler.play_effect(0);
                } else if(hud_object.about_button_hover == 1){
                    window.location = './about.html';
                }
            } else {
                if(hud_object.on_back_button()){
                    controller.on_menu_screen = false;
                    hud_object.menu_screen_option = 0;
                    audio_handler.play_effect(0);
                }
            }
        } else {
            // We must have the game over screen
            controller.game_running = false;
            controller.game_over = false;
            controller.score = 0;
            hud_object.menu_screen_option = 0;
        }
    }

});

/* Check for if the user is mousing over a menu item on the start screen */
function getMousePos(canvas, evt) {
    var rect = hud_canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function game_mouse(event){
    // Left Click == 1
    if(event.which == 1){
        game_content.paws.left_paw_click();
        // Right Click == 3
    } else if(event.which == 3){
        game_content.paws.right_paw_click();
    }
}

// Keyboard events

$(document.body).on('keydown', function(e) {
    if(!controller.game_over && controller.game_running){
        switch (e.which) {
            // key code for left arrow
            case 37:
                game_content.paws.left_paw_click();
                break;
            //key code for 'a'
            case 65:
                game_content.paws.left_paw_click();
                break;
            // key code for right arrow
            case 39:
                game_content.paws.right_paw_click();
                break;
            // key code for 'd'
            case 68:
                game_content.paws.right_paw_click();
        }
    }
});
