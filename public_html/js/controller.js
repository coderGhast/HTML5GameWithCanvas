function Controller(){
    this.game_running = true;
    this.level = 1;
}

function prepare_game(){
     // Start animation
    requestAnimationFrame(animate);
    // Start the game logic loop
    game_step();
    // Add listener to audio for looping
    game_content.audio_handler.audio.addEventListener("ended", game_content.audio_handler.loop, false);
}

Controller.prototype.start_game = function(){
    this.game_running = true;
    game_content.run();
}

Controller.prototype.end_game = function(){
    this.game_running = false;
    game_content.stop();
}
