/** Handles operations with a 'food', treating them as Objects **/
function Item(type){
    this.image = new Image();
    this.item_height_position = 0;
    this.item_frame = 0;
    this.item_type = type;
    this.blink_num = 0;

    this.default_item_height_position = food_canvas.width / 4;
    this.item_height_position = this.default_item_height_position;
    this.set_image();
}


Item.prototype.default_item_height_position = 0;
Item.prototype.blink_timer = 1000/ 60;

Item.prototype.set_image = function(){
    if(this.item_type.localeCompare("sushi") == 0){
        this.image.src = "img/foodstuffs/sushi_sprite.png";
    } else if(this.item_type.localeCompare("chicken") == 0){
        this.image.src = "img/foodstuffs/chicken_leg_sprite.png";
    }
}

Item.prototype.update_blink = function(){
     this.blink_num = Math.floor(Math.random()*(100-0+1)+0);
     if(this.blink_num > 75){
        this.item_frame = 1;
    } else {
        this.item_frame = 0;
    }
}

Item.prototype.paint_item = function(){
    food_context.drawImage(this.image, 100 * this.item_frame, 0, 100, 80, (food_canvas.width / 2) - (this.image.width / 4), 
        this.item_height_position, 100, 80);
}
