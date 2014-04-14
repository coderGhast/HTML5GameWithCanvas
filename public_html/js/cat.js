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
var knock_item = false;
var pull_item = false;
var keep_painting_item = true;

var spin_degrees = 0;

var hud_object = new Hud();
var watcher = new Watcher();

var left_movement_width = 0;
var left_movement_height = 0;
var right_movement_width = 0;
var right_movement_height = 0;

run();

function run(){
    // Start the game loop.
    loadImages();
    // Start the autio
    //audio.play();
    // Add the first item to the array of game_items.
    add_new_item();
    // Start animation
    requestAnimationFrame(animate);
    // Start the game logic loop
    game_step();
    // Blink, my pretties! Blink!
    blink_controller();
    // Add listener to audio for looping
    audio.addEventListener("ended", loop, false);
    // Start turning the watcher
    time_watcher_turn();
}

function animate(time){
    setTimeout(function() {
        window.requestAnimationFrame(animate);
        
        if(move_left_paw){
            handle_left_paw_movement();
        }
        if(move_right_paw){
            handle_right_paw_movement();
        }


        watcher.paint_watcher();

        spin_controller();
        paint_all_items();

        hud_object.print_hud_overlay();
    }, interval);
};

function game_step(){
    if(hud_object.lives <=0 ){
        hud_object.game_over_screen();
    }

    if(pull_item && !move_right_paw && !move_left_paw){
        for (var i=0;  i < game_items.length; i++) {
            if(!game_items[i].to_be_knocked){
                if(game_items[i].y > (canvas.height / 6) * 3){
                    hud_object.add_score(game_items[i].score_value);
                    hud_object.most_recent_eaten = game_items[i];
                    game_items.shift();
                }
                if(game_items[i].y < (canvas.height / 6 ) * 4){
                    game_items[i].y = game_items[i].y + (canvas.height / 6);
                }
            }
        }
        add_new_item();
        pull_item = false;
    } else if(knock_item){
        for (var i=0;  i < game_items.length; i++) {
            if(game_items[i].y > (canvas.height / 6) * 3){
             game_items[i].to_be_knocked = true;
             if(move_left_paw){
                game_items[i].pushed_by = 1;
            } else {
                game_items[i].pushed_by = 3;
            }
            bounced_items.push(game_items[i]);
            game_items.shift();
        }
    }
    knock_item = false;
}

if(bounced_items.length > 0){
    for(var i=0; i < bounced_items.length; i++){
        if(bounced_items[i].pushed_by == 1){
            bounced_items[i].x-=bounced_items[i].bounce_x;
            bounced_items[i].y-=bounced_items[i].bounce_y;
        } else {
            bounced_items[i].x+=bounced_items[i].bounce_x;
            bounced_items[i].y-=bounced_items[i].bounce_y;
        }
        if(bounced_items[i].x < 0 - 50 || bounced_items[i].x > canvas.width 
            || bounced_items[i].y < 0 - 50 || bounced_items[i].y > canvas.height){
            bounced_items.shift();
    }
}
}

watcher.decide_watcher_state();

check_music();
setTimeout(game_step, interval);
}

function handle_left_paw_movement(){
    if(right_paw_extended){
        reset_right_paw();
    }
    clearCanvas();
    if(!left_paw_extended){
        paint_left_paw_grab();
        if(left_movement_width <=  canvas.width / 100){
            left_movement_width++;
        } else {
            left_movement_height++;
            if(left_movement_height >= 10){
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
        reset_left_paw();
    }
    clearCanvas();
    if(!right_paw_extended){
        paint_right_paw_grab();
        if(right_movement_width < canvas.width / 100){
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
    // Check that no paw is currently already moving.
    if(!move_left_paw && !left_paw_moving && !move_right_paw && !right_paw_moving){

        if(watcher.watcher_staring){
            hud_object.lives--;
        }

        move_left_paw = true;

        if(!left_paw_extended){
            pull_item = true;
        } else {
            pull_item = false;
            knock_item = true;
        }
    }


}

/*
 * React to a user clicking right-click on the mouse.
 */
 function right_paw_click() {
    // Check that no paw is currently already moving.
    if(!move_right_paw && !right_paw_moving && !move_left_paw && !left_paw_moving){

        if(watcher.watcher_staring){
            hud_object.lives--;
        }

        move_right_paw = true;
        if(!right_paw_extended){
            pull_item = true;
        } else {
            pull_item = false;
            knock_item = true;
        }
    }


}



function paint_left_paw_grab(){
    context.save();
    context.translate(0 - (left_paw_image.width / 2), canvas.height - (left_paw_image.height * 1.3));
    context.rotate(left_movement_height * (Math.PI / 180));  
    // Return the canvas/paw back to where the image should be painted.
    // NOTE: 50 - The 'reach' of the paw in width, 10 - The - 'pull/push' of the paw in height.
    context.translate((left_movement_width * 50), (left_movement_height * 10));
    context.drawImage(left_paw_image, 0, 0); 
    context.restore();
}

function paint_right_paw_grab(){
    context.save();
    context.translate(canvas.width - (right_paw_image.width / 2), canvas.height - (right_paw_image.height * 1.3));
    context.rotate(-(right_movement_height) * (Math.PI / 180));  
    context.translate(-(right_movement_width * 50), (right_movement_height * 10));
    context.drawImage(right_paw_image, 0, 0); 
    context.restore();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function paint_left_paw(){
    context.drawImage(left_paw_image, 0 - (left_paw_image.width / 2), canvas.height - (left_paw_image.height * 1.3));

}

function paint_right_paw(){
    context.drawImage(right_paw_image, canvas.width - (right_paw_image.width / 2), canvas.height - (right_paw_image.height * 1.3));

}

function loadImages() {
    left_paw_image.onload = function() {
        paint_left_paw();
    };
    right_paw_image.onload = function() {
        paint_right_paw();
    };
}
