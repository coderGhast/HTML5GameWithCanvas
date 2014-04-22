/* Things to do with the sound content of the game */
function AudioHandler(){
    this.audio = new Audio("music/scheming_weasel_faster.mp3");
    this.set_audio_loop();
    this.audio.load();

    this.music_play = true;
    this.sfx_play = true;

    this.sfx_pickup_good_1 = this.make_sound_bank("music/sfx/pickup_good_1.mp3");
    this.sfx_pickup_good_2 = this.make_sound_bank("music/sfx/pickup_good_2.mp3");
    this.sfx_kick_away = this.make_sound_bank("music/sfx/kick_away.mp3");
    this.sfx_caught = this.make_sound_bank("music/sfx/caught.mp3");
    this.sfx_select = this.make_sound_bank("music/sfx/select.mp3");
}

/* Set the music to loop through an event listener */
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

/* Create multiple copies of the same sound effects in order to play multiple
 * of the same sound at the same time. */
AudioHandler.prototype.make_sound_bank = function(sound_location){
    var sound_bank = {};
    for(var i=0; i<4; i++){
        var sfx = new Audio(sound_location);
        sfx.volume = .09;
        sfx.onended = function(){this.pause();};
        sfx.load();
        sound_bank[i] = sfx;
    }
    return sound_bank;
}

// If the user has clicked to turn the audio off, go do it!
AudioHandler.prototype.toggle_audio = function(){
    this.stop_music();
    hud_object.toggle_audio_button();
}

AudioHandler.prototype.toggle_sfx = function() {
    this.stop_sfx();
    hud_object.toggle_sfx_button();
}

/* Mute/Unmute the music, and set this as the preference in the local storage */
AudioHandler.prototype.stop_music = function(){
    if(this.music_play){
        localStorage.setItem('catzeau_audio', 0);
        this.music_play = false;
    } else {
        localStorage.setItem('catzeau_audio', 1);
        this.music_play = true;
    }
}

/* Mute/Unmute the sound effects, and set this as the preference in the local storage */
AudioHandler.prototype.stop_sfx = function(){
    if(this.sfx_play){
        localStorage.setItem('catzeau_sfx', 0);
        this.sfx_play = false;
    } else {
        localStorage.setItem('catzeau_sfx', 1);
        this.sfx_play = true;
    }
}

AudioHandler.prototype.check_music = function(){
    if(!this.music_play){
        this.audio.pause();
    } else {
        this.audio.play();
    }
}

/* Play a sound effect. If one sound effect isn't available, try another. */
AudioHandler.prototype.play_effect = function(effect_type){
    if(this.sfx_play){
        switch(effect_type){
            case(0): this.choose_effect(this.sfx_select); break;
            case(1): if(Math.floor(Math.random()*(2-1+1)+1) == 1) {
                        this.choose_effect(this.sfx_pickup_good_1);
                    } else {
                        this.choose_effect(this.sfx_pickup_good_2);
            } break;
            case(2): this.choose_effect(this.sfx_kick_away); break;
            case(3): this.choose_effect(this.sfx_caught); break;
            default:
        }
    }
}

/* Play the requested type of sound effect for the right action. */
AudioHandler.prototype.choose_effect = function(sound_bank){
        if(sound_bank[0].duration > 0 && sound_bank[0].paused){
            sound_bank[0].play();
        } else if(sound_bank[1].duration > 0 && sound_bank[1].paused){
            sound_bank[1].play();
        } else if(sound_bank[2].duration > 0 && sound_bank[2].paused){
            sound_bank[2].play();
        } else if(sound_bank[3].duration > 0 && sound_bank[3].paused){
            sound_bank[3].play();
        }
}
