window.onload = function(){
    var controller = new Controller();
    var game_content = new GameContent();

    window['controller'] = controller;
    window['game_content'] = game_content;
    prepare_game();
}
