function Hud(){
    this.score = 0;
    this.lives = 3;
    this.item_box_x = ((hud_canvas.width / 6) * 4) - 5;
    this.item_box_width = 100;
    this.item_box_y = ((hud_canvas.height / 10) * 9) + 5;
    this.item_box_height = 50;
    this.most_recent_eaten = new Item("empty");
}

Hud.prototype.print_hud_overlay = function(){
    this.clear_hud_canvas();
    this.paint_bottom_bar();
    this.paint_item_box();
    if(this.most_recent_eaten.item_type.localeCompare("empty") != 0){
        this.paint_most_recent_eaten();
    }
    this.print_total_score();
    this.print_lives();
}

Hud.prototype.paint_bottom_bar = function(){
    hud_context.fillStyle ="rgba(137, 171, 137, 1.0)";
    hud_context.fillRect(0, (hud_canvas.height / 10) * 9, hud_canvas.width, hud_canvas.height / 10);
    hud_context.beginPath();
    hud_context.moveTo(0, (hud_canvas.height / 10) * 9);
    hud_context.lineTo(hud_canvas.width, (hud_canvas.height / 10) * 9);
    hud_context.stroke();
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
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.fillText("Score: " + this.score, 15,40);
}

Hud.prototype.print_lives = function(){
    hud_context.font="20px Georgia";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.fillText("Lives: " + this.lives, 20, hud_canvas.height - 30);
}

Hud.prototype.paint_most_recent_eaten = function(){
    hud_context.drawImage(this.most_recent_eaten.image, 100 * this.most_recent_eaten.item_frame, 0, 100, 80, 
        this.item_box_x + 5, this.item_box_y + 5, 50, 40);
    hud_context.font="20px Georgia";
    hud_context.fillStyle = "rgba(0, 0, 0, 1.0)";
    hud_context.fillText("+" + this.most_recent_eaten.score_value, this.item_box_x + (this.item_box_width / 2) + 10, this.item_box_y + (this.item_box_height / 2));
}

Hud.prototype.game_over_screen = function(){

}
