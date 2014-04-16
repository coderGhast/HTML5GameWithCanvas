//============= All info about the WATCHER

function Watcher(){
    this.watcher_position = 0;
    this.watcher_frame = 6;
    this.turn_watcher = false;
    this.watcher_looking = false;
    this.watcher_staring = false;
    this.image = new Image();
    this.image.src = "img/watcher_sprite.png";
}

Watcher.prototype.paint_watcher = function(){
    watcher_context.clearRect(canvas.width - (this.image.width / 7), 0, canvas.width + (this.image.width / 7), this.image.height);
    watcher_context.drawImage(this.image, 140 * this.watcher_frame, 0, 140, 190, canvas.width - (this.image.width / 7), 0, 140, 190);
}


function time_watcher_turn(){
    if(game_content.watcher.turn_watcher){
        if(game_content.watcher.watcher_looking){
            game_content.watcher.watcher_staring = false;
            game_content.watcher.watcher_frame++;
            if(game_content.watcher.watcher_frame == 6){
                game_content.watcher.turn_watcher = false;
                game_content.watcher.watcher_looking = false;
            }
        } else {
            game_content.watcher.watcher_frame--;
            if (game_content.watcher.watcher_frame == 1){
                game_content.watcher.turn_watcher = false;
                game_content.watcher.watcher_looking = true;
                game_content.watcher.watcher_staring = true;
            }
        }
    }
    setTimeout(time_watcher_turn, interval * 5);
}

Watcher.prototype.decide_watcher_state = function(){
    if(this.turn_watcher == false){
        if((Math.floor(Math.random()*(10000-0+1)+0)) >= 9950){
            this.turn_watcher = true;
        }        
    }
}
