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

var fps = 11;
var left_movement_step = 0;
var right_movement_step = 0;


paintBackground();
loadImages();


/* This is the main 'game loop', that
continues throughout the time that
the page is loaded. It also has parameters
for the FPS and speed of the loop.
    */
function animate(time){
    setTimeout(function() {
        requestAnimationFrame(animate);

        if(left_paw_grabbing) {
            paint_left_paw_grab();
        } else if (right_paw_grabbing){
            paint_right_paw_grab();
        } else {
            clearCanvas();
            paintBackground();
            paint_left_paw();
            paint_right_paw();
        }


    }, 1000/ fps);
};
requestAnimationFrame(animate);

function left_paw_move() {
    if(!left_paw_grabbing){
        left_paw_grabbing = true;
        right_movement_step = 0;
        right_paw_grabbing = false;
    } else {
        left_paw_grabbing = false;
        left_movement_step = 0;
        right_paw_grabbing = false;
    }
}

function right_paw_move() {
    if(!right_paw_grabbing){
        right_paw_grabbing = true;
        left_movement_step = 0;
        left_paw_grabbing = false;
    } else {
        right_paw_grabbing = false;
        right_movement_step = 0;
        left_paw_grabbing = false;
    }
}


function paint_left_paw_grab(){

    var rotation = 10 * left_movement_step;
    var width_position = left_movement_step * 10;
    var height_position = left_movement_step * 0.5;
    clearCanvas();
    paintBackground();

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();
    context.translate((canvas_width - left_paw_image.width) / width_position, left_paw_image.height * height_position);
    context.rotate(rotation *Math.PI/180);
    context.drawImage(left_paw_image,0, -left_paw_image.height);
    if(left_movement_step <= 4){
        left_movement_step++;
    }   

    // we’re done with the rotating so restore the unrotated context
    context.restore();

    paint_right_paw();
}


function paint_right_paw_grab(){
    clearCanvas();
    paintBackground();

    // save the unrotated context of the canvas so we can restore it later
    // the alternative is to untranslate & unrotate after drawing
    context.save();

    // move to the center of the canvas
    context.translate((canvas_width - right_paw_image.width) / 3, right_paw_image.height);

    // rotate the canvas to the specified degrees
    context.rotate(-50*Math.PI/180);

    // draw the image
    // since the context is rotated, the image will be rotated also
    context.drawImage(right_paw_image,0,-right_paw_image.height/2);

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
