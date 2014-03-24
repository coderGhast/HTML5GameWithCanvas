var mouse;

// Assigning the mouse/client area listener for the mouse position (utilities.js).
mouse = utilities.captureMouse(canvas);

function getmouse(canvas, evt) {
    if(evt == 'click'){

    }
}

/* Mouse movement
canvas.addEventListener('mousemove', function(evt) {
    mouse = getmouse(canvas, evt);
}, false);
*/

/* JQuery script to detect mouse clicks! */
$('#game_main').mousedown(function(event) {
    switch (event.which) {
        case 1:
            left_paw_move();
            break;
        case 3:
            right_paw_move();
            break;
        default:
    }
});
