var mouse;

// Assigning the mouse/client area listener for the mouse position (utilities.js).
mouse = utilities.captureMouse(canvas);

/* Mouse movement
canvas.addEventListener('mousemove', function(evt) {
    mouse = getmouse(canvas, evt);
}, false);
*/

/* JQuery script to detect mouse clicks! */
$('#game_main').mousedown(function(event) {
    if(event.which == 1){
        left_paw_click();
    } else if(event.which == 3){
        right_paw_click();
    }
});
