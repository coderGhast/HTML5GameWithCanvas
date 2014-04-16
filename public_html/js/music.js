function AudioHandler(){
    this.audio = new Audio("music/scheming_weasel_faster.mp3");
    this.set_audio_loop();
    this.audio.load();

    this.music_play = true;

    this.sfx_pickup_good_1 = this.make_sound_bank("music/sfx/pickup_good_1.mp3");
    this.sfx_pickup_good_2 = this.make_sound_bank("music/sfx/pickup_good_2.mp3");
    this.sfx_kick_away = this.make_sound_bank("music/sfx/kick_away.mp3");
    this.sfx_caught = this.make_sound_bank("music/sfx/caught.mp3");
}


AudioHandler.prototype.set_audio_loop = function(){
    if (typeof this.audio.loop == 'boolean')
    {
        this.audio.loop = true;
    }
    else
    {
        this.audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);
    }
}

AudioHandler.prototype.make_sound_bank = function(sound_location){
    var sound_bank = {};
    for(var i=0; i<3; i++){
        var sfx = new Audio(sound_location);
        sfx.volume = .11;
        sfx.load();
        sound_bank[i] = sfx;
    }
    return sound_bank;
}

// If the user has clicked to turn the audio off, go do it!
AudioHandler.prototype.toggle_audio = function(){
    this.stop_music();
    game_content.hud_object.toggle_audio_button();
}

AudioHandler.prototype.loop = function() {

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
    if(this.music_play){
        if(effect_type == 1){
            if(Math.floor(Math.random()*(2-1+1)+1) == 1) {
                this.choose_effect(this.sfx_pickup_good_1);
            } else {
                this.choose_effect(this.sfx_pickup_good_2);
            }
        } else if(effect_type == 2){
            this.choose_effect(this.sfx_kick_away);
        } else if(effect_type == 3){
            this.choose_effect(this.sfx_caught);
        }
    }
}

AudioHandler.prototype.choose_effect = function(sound_bank){
    if(sound_bank[0].duration > 0 && !sound_bank[0].paused){
            sound_bank[2].play();
        } else if(sound_bank[1].duration > 0 && !sound_bank[1].paused){
            sound_bank[1].play();
        } else {
            sound_bank[0].play();
        }
}
