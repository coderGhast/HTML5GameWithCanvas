function Hud(){
    this.menu_screen_option = 0;
    this.multiplier_up = false;
    this.multiplier_down = false;
    this.multiplier_count = 0;
    this.multiplier_time = 100;

    this.bottom_bar_image = new Image();
    this.bottom_bar_image.src = "img/controls_and_display/bottom_bar.png";

    this.start_screen_image = new Image();
    this.start_screen_image.src = "img/controls_and_display/menu_background.png";

    this.start_game_button = new Image();
    this.start_game_button.src = "img/controls_and_display/start_game.png";
    this.start_button_hover = 0;

    this.highscores_button = new Image();
    this.highscores_button.src = "img/controls_and_display/highscores.png";
    this.highscores_button_hover = 0;

    this.help_menu_button = new Image();
    this.help_menu_button.src = "img/controls_and_display/help.png";
    this.help_menu_button_hover = 0;

    this.about_button = new Image();
    this.about_button.src = "img/controls_and_display/about.png";
    this.about_button_hover = 0;

    this.back_button = new Image();
    this.back_button.src = "img/controls_and_display/back_button.png";

    this.help_menu_image = new Image();
    this.help_menu_image.src = "img/controls_and_display/help_menu.png";

    this.item_box_x = ((hud_canvas.width / 6) * 4) - 5;
    this.item_box_width = 100;
    this.item_box_y = ((hud_canvas.height / 10) * 9) + 5;
    this.item_box_height = 50;

    this.most_recent_eaten = new Item("empty");
    this.most_recent_eaten.image = new Image();

    this.audio_buttons = new Image();
    this.audio_buttons.src = "img/controls_and_display/audio_buttons.png";

    this.audio_button_state = 0;
    this.sfx_button_state = 0;

    this.cat_display = new CatDisplay();
}

//====== Loading Screen =======
Hud.prototype.paint_loading_screen = function(){
    hud_context.fillStyle = "#000000";
    hud_context.fillRect(0, 0, hud_canvas.width, hud_canvas.height);
    hud_context.font="20px Helvetica, Arial";
    hud_context.fillStyle = "#fff";
    hud_context.textAlign = "center";
    hud_context.fillText("Loading...", (hud_canvas.width / 2), (hud_canvas.height / 2) - 100);
}

//====== Start Menu HUD =======

Hud.prototype.paint_menu_screen = function(){
    switch(this.menu_screen_option){
        case(0): this.paint_start_screen(); break;
        case(1): this.paint_highscores_screen(); break;
        case(2): this.paint_help_screen(); break;
        case(3): this.paint_about_screen(); break;
        default: this.paint_start_screen();
    }
}

Hud.prototype.paint_start_screen = function(){
    this.clear_hud_canvas();
    this.paint_splash_image();
    this.paint_menu_items();
    this.paint_audio_buttons();
}

//====== Painting the various menu option results

Hud.prototype.paint_generic_menu = function(){
    this.paint_splash_image();
    hud_context.fillStyle = "#bccae3";
    hud_context.fillRect(20, 20, hud_canvas.width - 40, hud_canvas.height - 80);
    hud_context.fillStyle = "#f5f5f5";
    hud_context.fillRect(40, 40, hud_canvas.width - 80, hud_canvas.height - 120);
    this.paint_audio_buttons();
}

Hud.prototype.paint_highscores_screen = function(){
    this.paint_generic_menu();
    this.paint_back_button();
    this.print_current_run_highscore();
    this.print_highscore();
}

Hud.prototype.paint_help_screen = function(){
    this.paint_generic_menu();
    hud_context.drawImage(this.help_menu_image, 0, 0);
    this.paint_back_button();
}

Hud.prototype.paint_about_screen = function(){
    this.paint_generic_menu();
    this.paint_back_button();
}

Hud.prototype.paint_splash_image = function(){
    hud_context.drawImage(this.start_screen_image, 0, 0);
}

/*
 * Draw the menu items: Start, Help, Highscores, About)
 */
Hud.prototype.paint_menu_items = function(){
    // Start button
    hud_context.drawImage(this.start_game_button, 0, this.start_button_hover * (this.start_game_button.height / 2),
     this.start_game_button.width, (this.start_game_button.height / 2), (hud_canvas.width /2) - (this.start_game_button.width / 2), 
     360, this.start_game_button.width, (this.start_game_button.height / 2));

    // Highscores button
    hud_context.drawImage(this.highscores_button, 0, this.highscores_button_hover * (this.highscores_button.height / 2),
     this.highscores_button.width, (this.highscores_button.height / 2), (hud_canvas.width /2) - (this.highscores_button.width / 2), 
     400, this.highscores_button.width, (this.highscores_button.height / 2));

    // Help button
    hud_context.drawImage(this.help_menu_button, 0, this.help_menu_button_hover * (this.help_menu_button.height / 2),
     this.help_menu_button.width, (this.help_menu_button.height / 2), (hud_canvas.width /2) - (this.help_menu_button.width / 2), 
     430, this.help_menu_button.width, (this.help_menu_button.height / 2));

    // About button
    hud_context.drawImage(this.about_button, 0, this.about_button_hover * (this.about_button.height / 2),
     this.about_button.width, (this.about_button.height / 2), (hud_canvas.width /2) - (this.about_button.width / 2), 
     460, this.about_button.width, (this.about_button.height / 2));
}

// =========== Bottom Bar and Menu Controls

Hud.prototype.paint_back_button = function(){
    hud_context.drawImage(this.back_button, (hud_canvas.width / 2) - (this.back_button.width / 2), hud_canvas.height - this.back_button.height - 5);
}

Hud.prototype.on_back_button = function(){
    var hover = false;
    if(mousePos.x >= (hud_canvas.width / 2) - (this.back_button.width / 2)
        && mousePos.x <= (hud_canvas.width / 2) + (this.back_button.width / 2)
        && mousePos.y >= (hud_canvas.height) - (this.back_button.height) - 5
        && mousePos.y <= (hud_canvas.height) - 5){
        hover = true;
    }
    return hover;
}

Hud.prototype.paint_audio_buttons = function(){
    this.paint_music_button();
    this.paint_sfx_button();
}

Hud.prototype.paint_music_button = function(){
    hud_context.drawImage(this.audio_buttons, 
     this.audio_button_state * (this.audio_buttons.width / 2), 0,
     this.audio_buttons.width / 2, this.audio_buttons.height / 2,
     hud_canvas.width - (this.audio_buttons.width / 2) - 5, hud_canvas.height - (this.audio_buttons.height / 2) - 5,
     this.audio_buttons.width / 2, this.audio_buttons.height / 2);
}

Hud.prototype.toggle_audio_button = function(){
    if(audio_handler.music_play){
        this.audio_button_state = 0;
    } else {
        this.audio_button_state = 1;
    }
}

Hud.prototype.paint_sfx_button = function(){
    hud_context.drawImage(this.audio_buttons, 
     this.sfx_button_state * (this.audio_buttons.width / 2), (this.audio_buttons.height / 2),
     this.audio_buttons.width / 2, this.audio_buttons.height / 2,
     hud_canvas.width - (this.audio_buttons.width / 2) - 5, hud_canvas.height - (this.audio_buttons.height) - 10,
     this.audio_buttons.width / 2, this.audio_buttons.height / 2);
}

Hud.prototype.toggle_sfx_button = function(){
    if(audio_handler.sfx_play){
        this.sfx_button_state = 0;
    } else {
        this.sfx_button_state = 1;
    }
}

//====== During Game HUD =======

Hud.prototype.print_hud_overlay = function(){
    this.clear_hud_canvas();
    this.paint_bottom_bar();
    if(this.most_recent_eaten.item_type.localeCompare("empty") != 0){
        this.paint_most_recent_eaten();
    }
    this.print_total_score();
    this.print_lives();
    this.paint_cat_display();
    this.paint_audio_buttons();
    if(this.multiplier_up || this.multiplier_down){
        this.paint_multiplier_message();
        this.multiplier_count++
        if(this.multiplier_count > this.multiplier_time){
            this.multiplier_up = false;
            this.multiplier_down = false;
            this.multiplier_count = 0;
        }
    }
}

Hud.prototype.paint_multiplier_message = function(){
    game_content.watcher.update_random_turn_time();
    hud_context.font="27px Helvetica, Arial";
    hud_context.fillStyle = "rgba(255, 255, 255, 1.0)";
    hud_context.textAlign = "center";
    if(this.multiplier_up){
        hud_context.fillText("MULTIPLIER UP!", (hud_canvas.width / 2), (hud_canvas.height / 2) - 100);
        hud_context.fillText("x" + controller.multiplier, (hud_canvas.width / 2), (hud_canvas.height / 2) -50);
    } else if(this.multiplier_down){
        hud_context.fillText("MULTIPLIER LOST!", (hud_canvas.width / 2), (hud_canvas.height / 2) - 100);
    }
}

Hud.prototype.paint_bottom_bar = function(){
    hud_context.drawImage(this.bottom_bar_image, 0, hud_canvas.height - this.bottom_bar_image.height);
}

Hud.prototype.clear_hud_canvas = function(){
    hud_context.clearRect(0, 0, hud_canvas.width, hud_canvas.height);
}

Hud.prototype.print_total_score = function(){
    hud_context.font="20px Helvetica, Arial";
    hud_context.fillStyle = "rgba(136, 191, 235, 1.0)";
    hud_context.textAlign = "center";
    hud_context.fillText("Score: " + controller.score, (hud_canvas.width / 2), 15);
    hud_context.fillText("Multiplier: x" + controller.multiplier, (hud_canvas.width / 2), 35);
}

Hud.prototype.print_highscore = function(){
    hud_context.font="23px Helvetica, Arial";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.textAlign = "center";
    if(controller.new_highscore && controller.game_over){
        hud_context.fillText("NEW HIGH SCORE!!", (hud_canvas.width/2), (hud_canvas.height / 2) -25);
    }
    hud_context.fillText("Best High Score: " + controller.highscore, (hud_canvas.width / 2), (hud_canvas.height / 2));
}

Hud.prototype.print_current_run_highscore = function(){
    hud_context.font="27px Helvetica, Arial";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.textAlign = "center";
    hud_context.fillText("HIGHSCORES!!", (hud_canvas.width / 2), (hud_canvas.height / 2)- 140);
    hud_context.font="23px Helvetica, Arial";
    hud_context.fillText("Current Run High Score: " + controller.current_highscore, (hud_canvas.width / 2), (hud_canvas.height / 2) - 50);
}

Hud.prototype.print_lives = function(){
    for(var i = 0; i< controller.lives; i++){
        hud_context.drawImage(this.cat_display.cat_image, 0, 0, 150, 116, 90 + (i * 37.5), hud_canvas.height - 40, 37.5, 29);
    }
}

Hud.prototype.copy_item = function(passed_eaten_item){
    this.most_recent_eaten.item_type = passed_eaten_item.item_type;
    this.most_recent_eaten.score_value = passed_eaten_item.score_value;
    this.most_recent_eaten.item_frame = passed_eaten_item.item_frame;
    this.most_recent_eaten.image = passed_eaten_item.image;
}

Hud.prototype.paint_most_recent_eaten = function(){
    try{
        hud_context.drawImage(this.most_recent_eaten.image, 100 * this.most_recent_eaten.item_frame, 0, 100, 80, this.item_box_x + 5, this.item_box_y + 5, 50, 40);
    } catch (error){

    }
    hud_context.font="20px Helvetica, Arial";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.textAlign = "start";
    if(this.most_recent_eaten.score_value >= 0){
        hud_context.fillText("+" + this.most_recent_eaten.score_value, this.item_box_x + (this.item_box_width / 2) + 10, this.item_box_y + (this.item_box_height / 2));
    } else {
        this.cat_display.cat_image_emote = 1;
        hud_context.fillText(this.most_recent_eaten.score_value, this.item_box_x + (this.item_box_width / 2) + 10, this.item_box_y + (this.item_box_height / 2));
    }
    
}

// ======== Game Over ========
Hud.prototype.game_over_screen = function(){
    this.paint_generic_menu();
    this.paint_final_score();
    this.print_highscore();
    this.print_game_over_text();
}

Hud.prototype.paint_final_score = function(){
    hud_context.font="20px Helvetica, Arial";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.textAlign = "center";
    hud_context.fillText("FINAL SCORE: " + controller.score, hud_canvas.width / 2, hud_canvas.height / 2 - 70);
}

Hud.prototype.print_game_over_text = function(){
    hud_context.font="26px Helvetica, Arial";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.textAlign = "center";
    hud_context.fillText("YOU GOT CAUGHT TOO MUCH!", hud_canvas.width / 2, 70);
    hud_context.fillText("GAME OVER", hud_canvas.width / 2, 140);

    hud_context.font="18px Helvetica, Arial";
    hud_context.fillText("Click anywhere to try again", hud_canvas.width / 2, hud_canvas.height - 150);
}

// ============ CATDISPLAY: To do with the cat on the Hud display
function CatDisplay(){
    this.cat_image = new Image();
    this.cat_image.src = "img/catzeau/catzeau_sprites.png"
    this.cat_image_frame = 0;
    this.cat_image_emote = 0;
}

CatDisplay.prototype.reset_cat_doom = function(){
    this.cat_image_frame = 0;
    this.cat_image_emote = 0;
}

CatDisplay.prototype.change_face = function(){
    this.cat_image_frame = Math.floor(Math.random()*(2-0+1)+0);
}

function doom_faces(){
    if(Math.floor(Math.random()*(10-0+1)+0) >= 8){
        hud_object.cat_display.change_face();
    }

    setTimeout(doom_faces, interval * 30)
}

Hud.prototype.paint_cat_display = function(){
    hud_context.drawImage(this.cat_display.cat_image, 150 * this.cat_display.cat_image_frame, 116 * this.cat_display.cat_image_emote,
     150, 116, 0, 0, 150, 116);
}
