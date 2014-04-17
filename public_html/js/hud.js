function Hud(){
    this.menu_screen_option = 0;

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

    this.credits_button = new Image();
    this.credits_button.src = "img/controls_and_display/credits.png";
    this.credits_button_hover = 0;

    this.back_button = new Image();
    this.back_button.src = "img/controls_and_display/back_button.png";

    this.item_box_x = ((hud_canvas.width / 6) * 4) - 5;
    this.item_box_width = 100;
    this.item_box_y = ((hud_canvas.height / 10) * 9) + 5;
    this.item_box_height = 50;

    this.most_recent_eaten = new Item("empty");
    this.most_recent_eaten.image = new Image();

    this.audio_button = new Image();
    this.mute_audio_button = new Image();
    this.mute_audio_button.src = "img/controls_and_display/unmute_audio_button.png"
    this.unmute_audio_button = new Image();
    this.unmute_audio_button.src = "img/controls_and_display/mute_audio_button.png"

    this.audio_button = this.mute_audio_button;

    this.cat_display = new CatDisplay();
}

//====== Start Menu HUD =======

Hud.prototype.paint_menu_screen = function(){
    switch(this.menu_screen_option){
        case(0): this.paint_start_screen(); break;
        case(1): this.paint_highscores_screen(); break;
        case(2): this.paint_help_screen(); break;
        case(3): this.paint_credits_screen(); break;
        default: this.paint_start_screen();
    }
}

Hud.prototype.paint_start_screen = function(){
    this.clear_hud_canvas();
    this.paint_splash_image();
    this.paint_menu_items();
    this.paint_audio_button();
}

//====== Painting the various menu option results

Hud.prototype.paint_generic_menu = function(){
    hud_context.fillStyle = "#bccae3";
    hud_context.fillRect(0, 0, hud_canvas.width, hud_canvas.height);
    this.paint_audio_button();
    this.paint_back_button();
}

Hud.prototype.paint_highscores_screen = function(){
    this.paint_generic_menu();
}

Hud.prototype.paint_help_screen = function(){
    this.paint_generic_menu();
}

Hud.prototype.paint_credits_screen = function(){
    this.paint_generic_menu();
}

Hud.prototype.paint_splash_image = function(){
    hud_context.drawImage(this.start_screen_image, 0, 0);
}

/*
 * Draw the menu items: Start, Help, Highscores, Credits)
 */
Hud.prototype.paint_menu_items = function(){
    // Start button
    hud_context.drawImage(this.start_game_button, 0, this.start_button_hover * (this.start_game_button.height / 2),
     this.start_game_button.width, (this.start_game_button.height / 2), (hud_canvas.width /2) - (this.start_game_button.width / 2), 
     360, this.start_game_button.width, (this.start_game_button.height / 2));

    // Highscores
    hud_context.drawImage(this.highscores_button, 0, this.highscores_button_hover * (this.highscores_button.height / 2),
     this.highscores_button.width, (this.highscores_button.height / 2), (hud_canvas.width /2) - (this.highscores_button.width / 2), 
     400, this.highscores_button.width, (this.highscores_button.height / 2));

    // Help
    hud_context.drawImage(this.help_menu_button, 0, this.help_menu_button_hover * (this.help_menu_button.height / 2),
     this.help_menu_button.width, (this.help_menu_button.height / 2), (hud_canvas.width /2) - (this.help_menu_button.width / 2), 
     430, this.help_menu_button.width, (this.help_menu_button.height / 2));

    // Credits
    hud_context.drawImage(this.credits_button, 0, this.credits_button_hover * (this.credits_button.height / 2),
     this.credits_button.width, (this.credits_button.height / 2), (hud_canvas.width /2) - (this.credits_button.width / 2), 
     460, this.credits_button.width, (this.credits_button.height / 2));
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

Hud.prototype.paint_audio_button = function(){
    hud_context.drawImage(this.audio_button, hud_canvas.width - this.audio_button.width, hud_canvas.height - this.audio_button.height);
}

Hud.prototype.toggle_audio_button = function(){
    if(audio_handler.music_play){
        this.audio_button = this.mute_audio_button;
    } else {
        this.audio_button = this.unmute_audio_button;
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
    this.paint_audio_button();
}

Hud.prototype.paint_bottom_bar = function(){
    hud_context.drawImage(this.bottom_bar_image, 0, hud_canvas.height - this.bottom_bar_image.height);
}

Hud.prototype.clear_hud_canvas = function(){
    hud_context.clearRect(0, 0, hud_canvas.width, hud_canvas.height);
}

Hud.prototype.add_score = function(passed_score){
    audio_handler.play_effect(1);
    controller.score+=passed_score;
    this.paint_most_recent_eaten();
}

Hud.prototype.print_total_score = function(){
    hud_context.font="20px Georgia";
    hud_context.fillStyle = "rgba(136, 191, 235, 1.0)";
    hud_context.textAlign = "center";
    hud_context.fillText("Score: " + controller.score, (hud_canvas.width / 2), 20);
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
    hud_context.font="20px Georgia";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.textAlign = "start";
    hud_context.fillText("+" + this.most_recent_eaten.score_value, this.item_box_x + (this.item_box_width / 2) + 10, this.item_box_y + (this.item_box_height / 2));
}

// ======== Game Over ========
Hud.prototype.game_over_screen = function(){
    hud_context.fillStyle = "rgba(225, 225, 225, 1.0)";
    hud_context.fillRect(0, 0, hud_canvas.width, hud_canvas.height);
    this.paint_final_score();
    this.paint_audio_button();
}

Hud.prototype.paint_final_score = function(){
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.textAlign = "center";
    hud_context.fillText("FINAL SCORE: " + controller.score, hud_canvas.width / 2, hud_canvas.height / 2);
}

// ============ CATDISPLAY: To do with the cat on the Hud display
function CatDisplay(){
    this.cat_image = new Image();
    this.cat_image.src = "img/catzeau/catzeau_sprites.png"
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
