var item_names = new Array("sushi", "chicken", "ramen", "beef", "pancakes");

function add_new_item(){
    var item_selection = Math.floor(Math.random()*(5-1+1)+1);
    var new_item = new Item(item_names[item_selection - 1]);
    game_items.push(new_item);
}

function clear_food_canvas() {
    food_context.clearRect(0, 0, canvas.width, canvas.height);
}

function spin_controller(){
    spin_degrees = spin_degrees + 4;
    if(spin_degrees > 360){
        spin_degrees = 0;
    }
}

function blink_controller(){
    for (var i=0; i < game_items.length; i++) {
        game_items[i].update_blink();
    }
    setTimeout(blink_controller, interval * 35);
}

function paint_all_items(){
    clear_food_canvas();
    for (var i=0,  len = game_items.length; i < len; i++) {
        game_items[i].paint_item();      
    }
    for(var i=0, len = bounced_items.length; i < len; i++){
        bounced_items[i].paint_knock_item();
    }
}
