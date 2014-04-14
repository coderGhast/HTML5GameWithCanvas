function AudioHandler(){
    this.audio = new Audio("music/DST-XToFly.mp3");
    this.audio.load();
    this.music_play = false;

    this.sfx_pickup_good_1 = new Audio("music/sfx/pickup_good.wav");
    this.sfx_pickup_good_2 = new Audio("music/sfx/pickup_good.wav");
    this.sfx_pickup_good_1.load();
    this.sfx_pickup_good_2.load();

    this.sfx_kick = new Audio("music/sfx/kick_away.wav");
    this.sfx_kick.load();
}
//var audio = document.getElementById("game_background_audio");
//var music_play = false;

AudioHandler.prototype.loop = function() {
    this.audio.play();
}

AudioHandler.prototype.stop_music = function(){
    if(this.music_play){
        this.music_play = false;
    } else {
        this.music_play = true;
    }
}

AudioHandler.prototype.check_music = function(){
    if(!this.music_play){
        this.audio.pause();
    } else {
        this.audio.play();
    }
}

AudioHandler.prototype.play_effect = function(effect_type){
    if(effect_type == 1){
        if(this.sfx_pickup_good_1.duration > 0 && !this.sfx_pickup_good_1.paused){
            this.sfx_pickup_good_2.play();
        } else {
            this.sfx_pickup_good_1.play();
        }
    } else if(effect_type == 2){
        this.sfx_kick.play();
    }
}
