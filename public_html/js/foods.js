var front_item = new Image();
front_item.src = "img/foodstuffs/sushi_sprite.png";

var default_item_height = canvas.width / 4;
var current_item_height = default_item_height;

var item_frame = 0;
var counter = 0;

function get_item_height_position(){
    return current_item_height - (front_item.height / 2)
}

function blink_controller(){
     // TEMPORARY : Controls the sushi blink! :D
     counter++;
     if(counter > 100 && item_frame == 0){
        item_frame = 1;
    }
    if(counter > 125 && item_frame ==1){
        item_frame = 0;
        counter = 0;
    }

    setTimeout(blink_controller, interval);
}

function knock_item_away(){

}

