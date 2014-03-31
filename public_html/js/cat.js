var canvas = document.getElementById('game_main');
var context = canvas.getContext('2d');

/* Stops right click bringing up the menu on canvas right-clicks. */
$('body').on('contextmenu', '#game_main', function(e){ return false; });

canvas.width = 480;
canvas.height = 580;  

var left_paw_image = new Image();
left_paw_image.src = "img/left_paw.png";
var right_paw_image = new Image();
right_paw_image.src = "img/right_paw.png";

//===========
var move_left_paw = false;
var left_paw_moving = false;
var left_paw_extended = false;
//===========
var move_right_paw = false;
var right_paw_moving = false;
var right_paw_extended = false;
//============

var left_movement_width = 0;
var left_movement_height = 0;
var right_movement_width = 0;
var right_movement_height = 0;

var fps = 60;
var interval = 1000/fps;

loadImages();


/* This is the main 'game loop', that
continues throughout the time that
the page is loaded. It also has parameters
for the FPS and speed of the loop.
    */
function animate(time){
    setTimeout(function() {

        window.requestAnimationFrame(animate);

        if(move_left_paw){
            handle_left_paw_movement();
        }
        if(move_right_paw){
            handle_right_paw_movement();
        }
        
    }, interval);
};

function handle_left_paw_movement(){
    if(right_paw_extended){
        reset_left_paw();
        right_paw_extended = false;
    }
    clearCanvas();
    if(!left_paw_extended){
        paint_left_paw_grab();
        if(left_movement_width <  canvas.width / 50){
            left_movement_width++;
        } else {
            left_movement_height++;
            if(left_movement_height > 10){
                left_paw_extended = true;
                move_left_paw = false;
            }
        }
    } else if(left_paw_extended){
        paint_left_paw_grab();
        if(left_movement_height > 0){
            left_movement_height--;
        } else {
            left_movement_width--;
            if(left_movement_width == 0){
                left_paw_extended = false;
                move_left_paw = false;
            }
        }
    }
    if(right_paw_extended){
        paint_right_paw_grab();
    } else {
        paint_right_paw();
    }
}

function handle_right_paw_movement(){
    if(left_paw_extended){
        reset_right_paw();
        left_paw_extended = false;
    }
    clearCanvas();
    if(!right_paw_extended){
        paint_right_paw_grab();
        if(right_movement_width < canvas.width / 50){
            right_movement_width++;
        } else {
            right_movement_height++;
            if(right_movement_height > 10){
                right_paw_extended = true;
                move_right_paw = false;
            }
        }
    } else if(right_paw_extended){
        paint_right_paw_grab();
        if(right_movement_height > 0){
            right_movement_height--;
        } else {
            right_movement_width--;
            if(right_movement_width == 0){
                right_paw_extended = false;
                move_right_paw = false;
            }
        }
    }
    if(left_paw_extended){
        paint_left_paw_grab();
    } else {
        paint_left_paw();
    }
}

// Start the game loop.
requestAnimationFrame(animate);

function reset_left_paw(){
    left_movement_width = 0;
    left_movement_height = 0;
    left_paw_extended = false;
    move_left_paw = false;
}

function reset_right_paw(){
    right_movement_width = 0;
    right_movement_height = 0;
    right_paw_extended = false;
    move_right_paw = false;
}

/*
 * React to a user clicking left-click on the mouse.
 */
 function left_paw_click() {
    if(!move_left_paw && !left_paw_moving){
        move_left_paw = true;
    }
}

/*
 * React to a user clicking right-click on the mouse.
 */
 function right_paw_click() {
    if(!move_right_paw && !right_paw_moving){
        move_right_paw = true;
    }
}

/*
 * Paint the default canvas state.
 */
 function paint_default(){
    clearCanvas();
    paint_left_paw();
    paint_right_paw();
}


function paint_left_paw_grab(){
    context.save();
    context.translate((left_movement_width * 23), (left_movement_height * 10));
    context.rotate(left_movement_height* (Math.PI / 180));
    paint_left_paw();
    context.restore();
}

function paint_right_paw_grab(){
    context.save();
    context.translate(-((right_movement_width * 23) - (canvas.width / 2) - (right_paw_image.width / 4)),
     (right_movement_height * 10) + (canvas.height / 2) + (right_paw_image.height / 4));
    context.rotate(-(right_movement_height * (Math.PI / 180)));
    context.drawImage(right_paw_image, 0, 0);
    context.restore();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function paint_left_paw(){
    context.drawImage(left_paw_image, 0 - 150, canvas.height - (left_paw_image.height * 1.3));

}

function paint_right_paw(){
    context.drawImage(right_paw_image, canvas.width - 150, canvas.height - (right_paw_image.height * 1.3));

}

function loadImages() {
    left_paw_image.onload = function() {
        paint_left_paw();
    };
    right_paw_image.onload = function() {
        paint_right_paw();
    };
}
