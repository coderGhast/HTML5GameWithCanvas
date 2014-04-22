/* Deadling with animations and items upon the 'item/food' canvas. */
function ItemCanvas(){
    this.item_names = new Array("sushi", "chicken", "ramen", "beef", "pancakes", "bomb", "weight");
    this.table_image = new Image();
    this.table_image.src = "img/table.png";
}

ItemCanvas.prototype.add_new_item = function(){
    var item_selection = Math.floor(Math.random()*(this.item_names.length-1+1)+1);
    var new_item = new Item(this.item_names[item_selection - 1]);
    game_items.push(new_item);
}

ItemCanvas.prototype.clear_item_canvas = function() {
    food_context.clearRect(0, 0, food_canvas.width, food_canvas.height);
    food_context.drawImage(this.table_image, 0, 0);
}

/* Controls how an item spins as it is knocked off the table */
function spin_controller(){
    game_content.spin_degrees = game_content.spin_degrees + 4;
    if(game_content.spin_degrees > 360){
        game_content.spin_degrees = 0;
    }
}

/* Controls how each item randomly blinks over time */
function blink_controller(){
    for (var i=0; i < game_items.length; i++) {
        game_items[i].update_blink();
    }
    setTimeout(blink_controller, interval * 35);
}

/* Paints both bounced and on-table items */
ItemCanvas.prototype.paint_all_items = function(){
    this.clear_item_canvas();
    for (var i=0,  len = game_items.length; i < len; i++) {
        game_items[i].paint_item();      
    }
    for(var i=0, len = bounced_items.length; i < len; i++){
        bounced_items[i].paint_knock_item();
    }
}
