function GameContent(){
    this.paws = new Paws();

    this.knock_item = false;
    this.pull_item = false;
    this.keep_painting_item = true;

    this.spin_degrees = 0;
    this.item_count = 0;

    this.watcher = new Watcher();
}

GameContent.prototype.run = function(){
    this.clear_main_canvas();
    paint_left_paw();
    paint_right_paw();
    // Add the first item to the array of game_items.
    item_canvas.add_new_item();
}

GameContent.prototype.stop = function(){
    controller.lives = 5;
    controller.multiplier = 1;
    hud_object.multiplier_up = false;
    hud_object.multiplier_down = false;
    this.item_count = 0;
    game_items.length = 0;
    bounced_items.length = 0;
    this.watcher.reset_watcher();
    hud_object.most_recent_eaten = new Item("empty");
    hud_object.cat_display.reset_cat_doom();
    this.paws.reset_left_paw();
    this.paws.reset_right_paw();
}

function animate(time){
    setTimeout(function() {
        window.requestAnimationFrame(animate);
        
        if(controller.game_running){
            if(controller.game_over){
                hud_object.game_over_screen();
            } else {
                game_content.paint_game_screen();
            }
        } else {
            hud_object.paint_menu_screen();
        }
    }, interval);
};

GameContent.prototype.paint_game_screen = function(){
            if(game_content.paws.move_left_paw){
                game_content.paws.handle_left_paw_movement();
            }
            if(game_content.paws.move_right_paw){
                game_content.paws.handle_right_paw_movement();
            }

            game_content.watcher.paint_watcher();

            spin_controller();
            item_canvas.paint_all_items();

            hud_object.print_hud_overlay();
}

function game_step(){
    if(controller.game_running && !controller.game_over){
        game_content.check_player_life();
        game_content.item_movement();
        game_content.handle_bounced_items();
        game_content.watcher.decide_watcher_state();
    }
    audio_handler.check_music(); 
    setTimeout(game_step, interval);
}

GameContent.prototype.check_player_life = function(){
    if(controller.lives <= 0){
        controller.end_game();
        hud_object.game_over_screen();
    }
}

GameContent.prototype.add_score = function(passed_score){
    audio_handler.play_effect(1);
    controller.score+=passed_score * controller.multiplier;
    hud_object.paint_most_recent_eaten();
    if(passed_score >= 0){
        this.item_count++;
    } else {
        
        this.item_count = 0;
        if(controller.multiplier > 1){
            controller.multiplier = 1;
            hud_object.multiplier_down = true;
        }
    }
    if(this.item_count >= 15){
        this.item_count = 0;
        hud_object.multiplier_up = true;
        controller.multiplier = controller.multiplier * 2;
    }

    if(controller.score < 0 ){
        controller.score = 0;
    }
}

GameContent.prototype.handle_bounced_items = function(){
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
}

GameContent.prototype.item_movement = function(){
    if(this.pull_item && !this.paws.move_right_paw && !this.paws.move_left_paw){
        for (var i=0;  i < game_items.length; i++) {
            if(!game_items[i].to_be_knocked){
                if(game_items[i].y > (canvas.height / 6) * 3){
                    this.add_score(game_items[i].score_value);
                    hud_object.copy_item(game_items[0]);
                    hud_object.cat_display.cat_image_emote = 2;
                    game_items.shift();
                }
                if(game_items[i].y < (canvas.height / 6 ) * 4){
                    game_items[i].y = game_items[i].y + (canvas.height / 6);
                }
            }
        }
        item_canvas.add_new_item();
        this.pull_item = false;
    } else if(this.knock_item){
        for (var i=0;  i < game_items.length; i++) {
            if(game_items[i].y > (canvas.height / 6) * 3){
             game_items[i].to_be_knocked = true;
             if(this.paws.move_left_paw){
                game_items[i].pushed_by = 1;
            } else {
                game_items[i].pushed_by = 3;
            }
            if(game_items[i].score_value >= 0){
                hud_object.cat_display.cat_image_emote = 1;
                if(controller.multiplier > 1){
                    hud_object.multiplier_down = true;
                    controller.multiplier = 1;
                }
                this.item_count = 0;
            } else {
                hud_object.cat_display.cat_image_emote = 0;
            }
            bounced_items.push(game_items[i]);
            game_items.shift();
            audio_handler.play_effect(2);
        }
    }
    this.knock_item = false;
}
}



GameContent.prototype.check_player_caught = function(){
    var uncaught = true;
    if(this.watcher.watcher_staring){
        if(controller.multiplier > 1){
            hud_object.multiplier_down = true;
            controller.multiplier = 1;
        }
        this.item_count = 0;
        controller.lives--;
        audio_handler.play_effect(3);
        this.watcher.watcher_frame = 0;
        hud_object.cat_display.cat_image_emote = 1;
        uncaught = false;
    }
    return uncaught;
}


GameContent.prototype.clear_main_canvas = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function paint_left_paw_grab(){
    context.save();
    context.translate(0 - (game_content.paws.left_paw_image.width / 2), canvas.height - (game_content.paws.left_paw_image.height * 1.3));
    context.rotate(game_content.paws.left_movement_height * (Math.PI / 180));  
    // Return the canvas/paw back to where the image should be painted.
    // NOTE: 50 - The 'reach' of the paw in width, 10 - The - 'pull/push' of the paw in height.
    context.translate((game_content.paws.left_movement_width * 50), (game_content.paws.left_movement_height * 10));
    context.drawImage(game_content.paws.left_paw_image, 0, 0); 
    context.restore();
}

function paint_right_paw_grab(){
    context.save();
    context.translate(canvas.width - (game_content.paws.right_paw_image.width / 2), canvas.height - (game_content.paws.right_paw_image.height * 1.3));
    context.rotate(-(game_content.paws.right_movement_height) * (Math.PI / 180));  
    context.translate(-(game_content.paws.right_movement_width * 50), (game_content.paws.right_movement_height * 10));
    context.drawImage(game_content.paws.right_paw_image, 0, 0); 
    context.restore();
}

function paint_left_paw(){
    context.drawImage(game_content.paws.left_paw_image, 
        0 - (game_content.paws.left_paw_image.width / 2), canvas.height - (game_content.paws.left_paw_image.height * 1.3));

}

function paint_right_paw(){
    context.drawImage(game_content.paws.right_paw_image, 
        canvas.width - (game_content.paws.right_paw_image.width / 2), canvas.height - (game_content.paws.right_paw_image.height * 1.3));

}
