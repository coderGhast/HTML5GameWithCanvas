var mouse;

// Assigning the mouse/client area listener for the mouse position (utilities.js).
mouse = utilities.captureMouse(canvas);

/* Stops right click bringing up the menu on canvas right-clicks. */
$('body').on('contextmenu', '#game_main', function(e){ return false; });

/* JQuery script to detect mouse clicks! */
$('#game_main').mousedown(function(event) {
    if(event.which == 1){
        left_paw_click();
    } else if(event.which == 3){
        right_paw_click();
    }
});
