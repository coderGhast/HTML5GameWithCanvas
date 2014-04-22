/* Starts the game on the opening of the page */

window.onload = function(){
    var images = new ImageHandler();
    var controller = new Controller();
    var game_content = new GameContent();
    var audio_handler = new AudioHandler();
    var hud_object = new Hud();

    window['controller'] = controller;
    window['game_content'] = game_content;
    window['audio_handler'] = audio_handler;
    window['hud_object'] = hud_object;

    // Add the canvas items
    var item_canvas = new ItemCanvas();

    window['item_canvas'] = item_canvas;

    // Add the results of the mouse listener variable holder.
    window['mousePos'] = null;

    images.load_images(images.sources, prepare_game);
};
