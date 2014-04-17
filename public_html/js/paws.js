function Paws(){
    //====== Images =====
    this.left_paw_image = new Image();
    this.left_paw_image.src = "img/catzeau/left_paw.png";
    this.right_paw_image = new Image();
    this.right_paw_image.src = "img/catzeau/right_paw.png";

    //======= Movement Flags =====
    this.move_left_paw = false;
    this.left_paw_moving = false;
    this.left_paw_extended = false;
    this.move_right_paw = false;
    this.right_paw_moving = false;
    this.right_paw_extended = false;

    //======= Movement Numbers ====
    this.left_movement_width = 0;
    this.left_movement_height = 0;
    this.right_movement_width = 0;
    this.right_movement_height = 0;
}


Paws.prototype.handle_left_paw_movement = function(){
    if(this.right_paw_extended){
        this.reset_right_paw();
    }
    game_content.clear_main_canvas();
    if(!this.left_paw_extended){
        paint_left_paw_grab();
        if(this.left_movement_width <=  canvas.width / 100){
            this.left_movement_width++;
        } else {
            this.left_movement_height++;
            if(this.left_movement_height >= 10){
                this.left_paw_extended = true;
                this.move_left_paw = false;
            }
        }
    } else if(this.left_paw_extended){
        paint_left_paw_grab();
        if(this.left_movement_height > 0){
            this.left_movement_height--;
        } else {
            this.left_movement_width--;
            if(this.left_movement_width == 0){
                this.left_paw_extended = false;
                this.move_left_paw = false;
            }
        }
    }
    if(this.right_paw_extended){
        paint_right_paw_grab();
    } else {
        paint_right_paw();
    }
}

Paws.prototype.handle_right_paw_movement = function(){
    if(this.left_paw_extended){
        this.reset_left_paw();
    }
    game_content.clear_main_canvas();
    if(!this.right_paw_extended){
        paint_right_paw_grab();
        if(this.right_movement_width < canvas.width / 100){
            this.right_movement_width++;
        } else {
            this.right_movement_height++;
            if(this.right_movement_height > 10){
                this.right_paw_extended = true;
                this.move_right_paw = false;
            }
        }
    } else if(this.right_paw_extended){
        paint_right_paw_grab();
        if(this.right_movement_height > 0){
            this.right_movement_height--;
        } else {
            this.right_movement_width--;
            if(this.right_movement_width == 0){
                this.right_paw_extended = false;
                this.move_right_paw = false;
            }
        }
    }
    if(this.left_paw_extended){
        paint_left_paw_grab();
    } else {
        paint_left_paw();
    }
}

Paws.prototype.reset_left_paw = function(){
    this.left_movement_width = 0;
    this.left_movement_height = 0;
    this.left_paw_extended = false;
    this.move_left_paw = false;
}

Paws.prototype.reset_right_paw = function(){
    this.right_movement_width = 0;
    this.right_movement_height = 0;
    this.right_paw_extended = false;
    this.move_right_paw = false;
}

/*
 * React to a user clicking left-click on the mouse.
 */
 Paws.prototype.left_paw_click = function() {
    // Check that no paw is currently already moving.
    if(!this.move_left_paw && !this.left_paw_moving && !this.move_right_paw && !this.right_paw_moving){

        if(game_content.check_player_caught()){
            this.move_left_paw = true;

            if(!this.left_paw_extended){
                game_content.pull_item = true;
            } else {
                game_content.pull_item = false;
                game_content.knock_item = true;
            }
        }
    }
}

/*
 * React to a user clicking right-click on the mouse.
 */
 Paws.prototype.right_paw_click = function() {
    // Check that no paw is currently already moving.
    if(!this.move_right_paw && !this.right_paw_moving && !this.move_left_paw && !this.left_paw_moving){
        if(game_content.check_player_caught()){
            this.move_right_paw = true;
            if(!this.right_paw_extended){
                game_content.pull_item = true;
            } else {
                game_content.pull_item = false;
                game_content.knock_item = true;
            }
        }
    }
}
