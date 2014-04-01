var food_sushi = new Image();
food_sushi.src = "img/foodstuffs/sushi_sprite.png";

var sushi_frame = 0;
var counter = 0;

function get_sushi_height_position(){
    return (canvas.height / 2) - (food_sushi.height / 2)
}

function blink_controller(){
     // TEMPORARY : Controls the sushi blink! :D
     counter++;
     if(counter > 150 && sushi_frame == 0){
        sushi_frame = 1;
    }
    if(counter > 180 && sushi_frame ==1){
        sushi_frame = 0;
        counter = 0;
    }

    setTimeout(blink_controller, interval);
}

