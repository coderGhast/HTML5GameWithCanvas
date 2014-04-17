/** Handles operations with a 'food', treating them as Objects **/
function Item(passed_type){
    this.item_type = passed_type;
    this.image = new Image();

    this.set_image();
    this.score_value;

    this.item_height_position = 0;
    this.item_frame = 0;

    this.blink_num = 0;
    this.blink_timer = 1000/60;

    this.x = (food_canvas.width / 2) - 50;
    this.y = food_canvas.height / 8;

    this.bounce_x = Math.floor(Math.random()*(6-1+1)+1);
    this.bounce_y = Math.floor(Math.random()*(6-1+1)+1);

    this.to_be_knocked = false;
    this.out_of_bounds = false;
    this.pushed_by = 1; // 1 = Left Paw (mouse button 1), 3 = Right (mouse button 3)
}

Item.prototype.set_image = function(){
    if(this.item_type.localeCompare("sushi") == 0){
        this.image.src = "img/foodstuffs/sushi_sprite.png";
        this.score_value = 5;
    } else if(this.item_type.localeCompare("chicken") == 0){
        this.image.src = "img/foodstuffs/chicken_leg_sprite.png";
        this.score_value = 1;
    } else if(this.item_type.localeCompare("ramen") == 0){
        this.image.src = "img/foodstuffs/ramen_sprite.png";
        this.score_value = 3
    } else if(this.item_type.localeCompare("beef") == 0){
        this.image.src = "img/foodstuffs/beef_sprite.png";
        this.score_value = 2
    } else if(this.item_type.localeCompare("pancakes") == 0){
        this.image.src = "img/foodstuffs/pancakes_sprite.png";
        this.score_value = 4;
    } else if(this.item_type.localeCompare("bomb") == 0){
        this.image.src = "img/foodstuffs/bomb_sprite.png";
        this.score_value = -5;
    } else if(this.item_type.localeCompare("weight") == 0){
        this.image.src = "img/foodstuffs/weight_sprite.png";
        this.score_value = -3;
    } else if(this.item_type.localeCompare("empty") == 0){
        this.image.src = "img/foodstuffs/sushi_sprite.png";
        this.score_value = 0;
    }
}

Item.prototype.update_blink = function(){
    this.blink_num = Math.floor(Math.random()*(10-0+1)+0);

    if(this.blink_num >= 9){
        this.item_frame = 1;
    } else {
        this.item_frame = 0;
    }
}

Item.prototype.paint_item = function(){
    food_context.drawImage(this.image, 100 * this.item_frame, 0, 100, 80, this.x, this.y, 100, 80);
}

Item.prototype.paint_knock_item = function(){
    food_context.save();
    food_context.translate(this.x, this.y);
    food_context.translate(0, this.image.height / 2);
    food_context.rotate(game_content.spin_degrees * (Math.PI / 180));
    food_context.translate(-(this.image.width / 4), -(this.image.height / 2));
    food_context.drawImage(this.image, 100 * this.item_frame, 0, 100, 80, 0, 0, 100, 80);
    food_context.restore();
}
