window.onload = function(){
    var controller = new Controller();
    var game_content = new GameContent();
    var audio_handler = new AudioHandler();

    window['controller'] = controller;
    window['game_content'] = game_content;
    window['audio_handler'] = audio_handler;
    prepare_game();
}
