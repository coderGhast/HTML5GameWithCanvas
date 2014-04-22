/** Handles things like the lives and score of the player, passing data between different objects */
function Controller(){
    this.game_running = false;
    this.on_menu_screen = false;
    this.level = 1;
    this.lives = 5;
    this.score = 0;
    this.multiplier = 1;
    this.current_highscore = 0;
    this.highscore = 0;
    this.new_highscore = false;
    this.game_over = false;
}

/* Set up the game for initial running */
function prepare_game(){
    controller.check_highscore_status_storage();
    controller.check_audio_status_storage();
    controller.check_sfx_status_storage();

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

/* Start the game from the beginning */
Controller.prototype.start_game = function(){
    game_content.run();
    this.game_running = true;
}

/* Handle the end of a game, resetting the necessary values, 
 * updating the high score if necessary and setting a couple of boolean flags */
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

/* Check the high score containing in local storage. 
 * if it doesn't exist, make it exist */
Controller.prototype.check_highscore_status_storage = function(){
    controller.highscore = parseInt(localStorage.getItem('catzeau_highscore'));
    if(isNaN(controller.highscore) || controller.highscore == null){
        localStorage.setItem('catzeau_highscore', 0);
        controller.highscore = 0;
    }
}

/* Check the users preferences for the music mute */
Controller.prototype.check_audio_status_storage = function(){
    var play_audio = parseInt(localStorage.getItem('catzeau_audio'));
    if(isNaN(play_audio) || play_audio == null){
        localStorage.setItem('catzeau_audio', 1);
        audio_handler.music_play = true;
    } else {
        if(play_audio == 0){
            audio_handler.music_play = false;
            hud_object.toggle_audio_button();
        } else {
            audio_handler.music_play = true;
        }
    }
}

/* Check the users preferences for the sound effects mute */
Controller.prototype.check_sfx_status_storage = function(){
    var play_sfx = parseInt(localStorage.getItem('catzeau_sfx'));
    if(isNaN(play_sfx) || play_sfx == null){
        localStorage.setItem('catzeau_sfx', 1);
        audio_handler.sfx_play = true;
    } else {
        if(play_sfx == 0){
            audio_handler.sfx_play = false;
            hud_object.toggle_sfx_button();
        } else {
            audio_handler.sfx_play = true;
        }
    }
}

/* Add an event listener for the mouse clicking on the home screen buttons */
function add_mouse_event_listener(){
    hud_canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(hud_canvas, evt);
        if(!this.game_running){
            controller.hover_over_start_button();
            controller.hover_over_highscores_button();
            controller.hover_over_help_menu_button();
            controller.hover_over_about_button();
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

/* Set a variable for changing the colour of the text on the meny for the About option when
it is hovered over*/
Controller.prototype.hover_over_about_button = function(){
    if(mousePos.x >= (hud_canvas.width / 2) - (hud_object.about_button.width / 2) && 
        mousePos.x <= (hud_canvas.width / 2) + (hud_object.about_button.width / 2) &&
        mousePos.y >= 460 &&
        mousePos.y <= 460 + (hud_object.about_button.height / 2)){
        hud_object.about_button_hover = 1;
} else {
    hud_object.about_button_hover = 0;
}
}
