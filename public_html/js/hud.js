function Hud(){
    this.score = 0;
}

Hud.prototype.print_hud_overlay = function(){
    hud_context.clearRect(0, 0, hud_canvas.width, hud_canvas.height);
    this.print_total_score();
}

Hud.prototype.add_score = function(passed_score){
    this.score+=passed_score;
    this.print_passed_score(passed_score);
}

Hud.prototype.print_total_score = function(){
    hud_context.font="20px Georgia";
    hud_context.fillText("Score: " + this.score, 15,40);
}

Hud.prototype.print_passed_score = function(passed_score){
    passed_score.alpha = 10;
}

