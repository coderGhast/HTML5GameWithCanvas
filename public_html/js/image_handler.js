function ImageHandler() {
    this.sources = {
        resource1: "img/table.png",
        resource2: "img/watcher_sprite.png",

        resource3: "img/catzeau/catzeau_sprites.png",
        resource4: "img/catzeau/left_paw.png",
        resource5: "img/catzeau/right_paw.png",

        resource6: "img/controls_and_display/about.png",
        resource7: "img/controls_and_display/audio_buttons.png",
        resource8: "img/controls_and_display/back_button.png",
        resource9: "img/controls_and_display/bottom_bar.png",
        resource10: "img/controls_and_display/help.png",
        resource11: "img/controls_and_display/highscores.png",
        resource12: "img/controls_and_display/menu_background.png",
        resource13: "img/controls_and_display/score_bar.png",
        resource14: "img/controls_and_display/start_game.png",
        resource15: "img/controls_and_display/title_bar.png",

        resource16: "img/foodstuffs/beef_sprite.png",
        resource17: "img/foodstuffs/bomb_sprite.png",
        resource18: "img/foodstuffs/chicken_leg_sprite.png",
        resource19: "img/foodstuffs/pancakes_sprite.png",
        resource20: "img/foodstuffs/ramen_sprite.png",
        resource21: "img/foodstuffs/sushi_sprite.png",
        resource22: "img/foodstuffs/weight_sprite.png"
    };
};

ImageHandler.prototype.load_images = function(sources, callback){
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function(){
            if (++loadedImages >= numImages) {
                callback();
            } else {
                hud_object.paint_loading_screen();
            }
        };
        images[src].src = sources[src];
    }
}
