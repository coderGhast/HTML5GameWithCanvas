function Hud(){
    this.score = 0;
    this.lives = 5;

    this.bottom_bar_image = new Image();
    this.bottom_bar_image.src = "img/controls_and_display/bottom_bar.png";

    this.item_box_x = ((hud_canvas.width / 6) * 4) - 5;
    this.item_box_width = 100;
    this.item_box_y = ((hud_canvas.height / 10) * 9) + 5;
    this.item_box_height = 50;

    this.most_recent_eaten = new Item("empty");
    this.most_recent_eaten.image = new Image();

    this.audio_button = new Image();

    this.mute_audio_button = new Image();
    this.mute_audio_button.src = "img/controls_and_display/mute_audio_button.png"
    this.unmute_audio_button = new Image();
    this.unmute_audio_button.src = "img/controls_and_display/unmute_audio_button.png"

    this.audio_button = this.mute_audio_button;

    this.cat_display = new CatDisplay();
}

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

Hud.prototype.paint_item_box = function(){
    hud_context.fillStyle = "rgba(255, 255, 255, 1.0)";
    hud_context.fillRect(this.item_box_x, this.item_box_y, this.item_box_width, this.item_box_height);
    hud_context.rect(this.item_box_x, this.item_box_y, this.item_box_width, this.item_box_height);
    hud_context.stroke();
}

Hud.prototype.clear_hud_canvas = function(){
    hud_context.clearRect(0, 0, hud_canvas.width, hud_canvas.height);
}

Hud.prototype.add_score = function(passed_score){
    audio_handler.play_effect(1);
    this.score+=passed_score;
    this.paint_most_recent_eaten();
}

Hud.prototype.print_total_score = function(){
    hud_context.font="20px Georgia";
    hud_context.fillStyle = "rgba(136, 191, 235, 1.0)";
    hud_context.fillText("Score: " + this.score, (hud_canvas.width / 2) - 60, 20);
}

Hud.prototype.print_lives = function(){
    for(var i = 0; i< this.lives; i++){
        hud_context.drawImage(this.cat_display.cat_image, 0, 0, 150, 116, 90 + (i * 37.5), hud_canvas.height - 40, 37.5, 29);
    }
}

Hud.prototype.paint_caught = function(){

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
    hud_context.fillText("+" + this.most_recent_eaten.score_value, this.item_box_x + (this.item_box_width / 2) + 10, this.item_box_y + (this.item_box_height / 2));
}

Hud.prototype.game_over_screen = function(){

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

// =========== Bottom Bar Controls: Such as muting/unmuting audio_handler

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
