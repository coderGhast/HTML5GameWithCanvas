var audio = document.getElementById("game_background_audio");
var music_play = false;

function loop() {
    audio.play();
}

function stop_music(){
    if(music_play){
        music_play = false;
    } else {
        music_play = true;
    }
}

function check_music(){
    if(!music_play){
        audio.pause();
    } else {
        audio.play();
    }
}
