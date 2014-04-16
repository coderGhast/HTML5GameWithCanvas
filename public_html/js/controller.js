function Controller(){
    this.game_running = false;
    this.level = 1;
}

function prepare_game(){
     // Start animation
    requestAnimationFrame(animate);
    // Start the game logic loop
    game_step();
    game_content.run();
}

Controller.prototype.start_game = function(){
    this.game_running = true;
    game_content.run();
}

Controller.prototype.end_game = function(){
    this.game_running = false;
    game_content.stop();
}
