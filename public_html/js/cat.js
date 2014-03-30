var canvas = document.getElementById('game_main');
var context = canvas.getContext('2d');

/* Stops right click bringing up the menu on canvas right-clicks. */
$('body').on('contextmenu', '#game_main', function(e){ return false; });

canvas.width = 620;
canvas.height = 480;  

var canvas_height = canvas.height;
var canvas_width = canvas.width;

var left_paw_image = new Image();
left_paw_image.src = "img/left_paw.png";
var right_paw_image = new Image();
right_paw_image.src = "img/right_paw.png";

var left_paw_grabbing = false;
var right_paw_grabbing = false;

var fps = 66;
var left_movement_step = 3;
var right_movement_step = 3;


paintBackground();
loadImages();


/* This is the main 'game loop', that
continues throughout the time that
the page is loaded. It also has parameters
for the FPS and speed of the loop.
    */
function animate(time){
    setTimeout(function() {
        if(left_paw_grabbing) {
            paint_left_paw_grab();
        }
        if (right_paw_grabbing){
            paint_right_paw_grab();
        }
        requestAnimationFrame(animate);

    }, 1000/ fps);
};
// Start the game loop.
requestAnimationFrame(animate);

/*
 * React to a user clicking left-click on the mouse.
 */
function left_paw_move() {
    if(!left_paw_grabbing){
        // Set left paw to grab
        left_paw_grabbing = true;

        // Reset the right paw to no longer grabbing
        right_movement_step = 3;
        right_paw_grabbing = false;
    }
}

/*
 * React to a user clicking right-click on the mouse.
 */
function right_paw_move() {
    if(!right_paw_grabbing){
        // Set right paw to grab
        right_paw_grabbing = true;

        // Reset the left paw to no longer grabbing
        left_movement_step = 3;
        left_paw_grabbing = false;
    }
}

/*
 * Paint the default canvas state.
 */
function paint_default(){
    clearCanvas();
    paintBackground();
    paint_left_paw();
    paint_right_paw();
}


function paint_left_paw_grab(){
    var rotation = 10.5 * left_movement_step;
    var width_position = left_movement_step * 30;
    var height_position = left_movement_step * 0.3;
    var grab_position = left_movement_step * 20;
    clearCanvas();
    paintBackground();

    context.save();
    context.translate((canvas_width - left_paw_image.width) / width_position, left_paw_image.height * height_position);
    context.rotate(rotation *Math.PI/180);
    context.drawImage(left_paw_image,0, -(left_paw_image.height + grab_position));
    if(left_movement_step <= 6){
        left_movement_step+=0.3;
    } else {
        left_paw_grabbing = false;
        left_movement_step = 3;
    }   

    context.restore();

    paint_right_paw();
}


function paint_right_paw_grab(){
    var rotation = 10.5 * right_movement_step;
    var width_position = right_movement_step * 30;
    var height_position = right_movement_step * 0.3;
    var grab_position = right_movement_step * 20;
    clearCanvas();
    paintBackground();

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();

    // move to the center of the canvas
    context.translate((canvas_width - right_paw_image.width) / width_position, right_paw_image.height * height_position);

    // rotate the canvas to the specified degrees
    context.rotate(Math.PI/-rotation);

    // draw the image
    // since the context is rotated, the image will be rotated also
    context.drawImage(right_paw_image, (canvas_width - right_paw_image.width), -(right_paw_image.height - grab_position));
    if(right_movement_step <=6){
        right_movement_step+=0.3;
    } else {
        right_paw_grabbing = false;
        right_movement_step = 3;
    }

    // we’re done with the rotating so restore the unrotated context
    context.restore();

    paint_left_paw();
}

function paintBackground() {
    context.fillStyle = "gray";
    context.rect(0, 0, window.innerWidth, window.innerHeight);
    context.fill();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas_width, canvas_height);
}

function paint_left_paw(){
    context.drawImage(left_paw_image, 0, canvas_height - 250);

}

function paint_right_paw(){
    context.drawImage(right_paw_image, canvas_width - 200, canvas_height - 250);

}

function loadImages() {
    left_paw_image.onload = function() {
        paint_left_paw();
    };
    right_paw_image.onload = function() {
        paint_right_paw();
    };
}
