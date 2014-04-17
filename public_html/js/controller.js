function Controller(){
    this.game_running = false;
    this.on_menu_screen = false;
    this.level = 1;
    this.lives = 5;
    this.score = 0;
    this.current_highscore = 0;
    this.highscore = 0;
    this.new_highscore = false;
    this.game_over = false;
}

function prepare_game(){
    controller.highscore = parseInt(localStorage.getItem('catzeau_highscore'))
    if(isNaN(controller.highscore)){
        localStorage.setItem('catzeau_highscore', 0);
    }
     // Start animation
    requestAnimationFrame(animate);
    // Start the game logic loop
    game_step();
    add_mouse_event_listener();
    // Blink, my pretties! Blink!
    blink_controller();
    doom_faces();
    // Start turning the watcher
    time_watcher_turn();
}

Controller.prototype.start_game = function(){
    game_content.run();
    this.game_running = true;
}

Controller.prototype.end_game = function(){
    this.game_over = true;
    if(this.current_highscore < this.score){
        this.current_highscore = this.score;
    }
    if(this.highscore < this.score){
        this.new_highscore = true;
        this.highscore = this.score;
        window.localStorage.setItem('catzeau_highscore', this.score.toString());
    } else {
        this.new_highscore = false;
    }
    game_content.stop();
}

function add_mouse_event_listener(){
    hud_canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(hud_canvas, evt);
    if(!this.game_running){
        controller.hover_over_start_button();
        controller.hover_over_highscores_button();
        controller.hover_over_help_menu_button();
        controller.hover_over_credits_button();
    }
}, false);
}

/* Set a variable for changing the colour of the text on the meny for the Start Game option when
 it is hovered over*/
Controller.prototype.hover_over_start_button = function(){
    if(mousePos.x >= (hud_canvas.width / 2) - (hud_object.start_game_button.width / 2) && 
        mousePos.x <= (hud_canvas.width / 2) + (hud_object.start_game_button.width / 2) &&
        mousePos.y >= 360 &&
        mousePos.y <= 360 + (hud_object.start_game_button.height / 2)){
        hud_object.start_button_hover = 1;
    } else {
        hud_object.start_button_hover = 0;
    }
}

/* Set a variable for changing the colour of the text on the meny for the Highscores option when
 it is hovered over*/
Controller.prototype.hover_over_highscores_button = function(){
    if(mousePos.x >= (hud_canvas.width / 2) - (hud_object.highscores_button.width / 2) && 
        mousePos.x <= (hud_canvas.width / 2) + (hud_object.highscores_button.width / 2) &&
        mousePos.y >= 400 &&
        mousePos.y <= 400 + (hud_object.highscores_button.height / 2)){
        hud_object.highscores_button_hover = 1;
    } else {
        hud_object.highscores_button_hover = 0;
    }
}

/* Set a variable for changing the colour of the text on the meny for the Help option when
 it is hovered over*/
Controller.prototype.hover_over_help_menu_button = function(){
    if(mousePos.x >= (hud_canvas.width / 2) - (hud_object.help_menu_button.width / 2) && 
        mousePos.x <= (hud_canvas.width / 2) + (hud_object.help_menu_button.width / 2) &&
        mousePos.y >= 430 &&
        mousePos.y <= 430 + (hud_object.help_menu_button.height / 2)){
        hud_object.help_menu_button_hover = 1;
    } else {
        hud_object.help_menu_button_hover = 0;
    }
}

/* Set a variable for changing the colour of the text on the meny for the Credits option when
 it is hovered over*/
Controller.prototype.hover_over_credits_button = function(){
    if(mousePos.x >= (hud_canvas.width / 2) - (hud_object.credits_button.width / 2) && 
        mousePos.x <= (hud_canvas.width / 2) + (hud_object.credits_button.width / 2) &&
        mousePos.y >= 460 &&
        mousePos.y <= 460 + (hud_object.credits_button.height / 2)){
        hud_object.credits_button_hover = 1;
    } else {
        hud_object.credits_button_hover = 0;
    }
}
