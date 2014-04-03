// TEMPORARY : Just to display the animation on the canvas.
var item_names = new Array("sushi", "chicken", "sushi", "chicken");

function add_new_item(){
    var item_selection = Math.floor(Math.random()*(4-1+1)+1);
    var new_item = new Item(item_names[item_selection - 1]);
    game_items.push(new_item);
}

function clear_food_canvas() {
    food_context.clearRect(0, 0, canvas.width, canvas.height);
}

function paint_knock_item(passed_item){
    clear_food_canvas();
    food_context.save();
    food_context.translate((food_canvas.width / 2), passed_item.item_height_position);
    food_context.translate(0, passed_item.image.height / 2);
    food_context.rotate(spin_degrees * (Math.PI / 180));
    food_context.translate(-(passed_item.image.width / 4), -(passed_item.image.height / 2));
    food_context.drawImage(passed_item.image, 100 * passed_item.item_frame, 0, 100, 80, 0, 0, 100, 80);
    food_context.restore();
}
