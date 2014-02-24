var canvas = document.getElementById('canvas_main');
// Assigning the mouse/client area listener for the mouse position (utilities.js).
	mouse = utilities.captureMouse(canvas);
var context = canvas.getContext('2d');

var canvas_bg = document.getElementById('canvas_city_1');
var context_bg = canvas_bg.getContext('2d');

var	shipImageLeft = new Image();
shipImageLeft.src = "img/player_ship_l.png";
var shipImageRight = new Image();
shipImageRight.src = "img/player_ship_r.png";

var mouse;
var imageY;

var mouseTracking = false;
var fps = 66;

var bg_offset=1000;

var backgroundImage1 = new Image();
backgroundImage1.src = "img/bg_1.png";
var bg_x1 = 0;
	  
var backgroundImage2 = new Image();
backgroundImage2.src = "img/bg_2.png";
var bg_x2 = 0;
	  
var backgroundImage3 = new Image();
backgroundImage3.src = "img/bg_3.png";
var bg_x3 = 0;
	  
function getmouse(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	mouseTracking = true;
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

loadImages();
function animate(time){
    setTimeout(function() {
	requestAnimationFrame(animate);
        if(mouseTracking){  
            if(mouse.x != null){
                if(mouse.x < (canvas.width/2)){
                    if(mouse.x < 350 && mouse.x > 300){
                        bg_x1+=4;
                        bg_x2+=2;
                        bg_x3+=1;
                    } else if(mouse.x < 300 && mouse.x > 200) {
                        bg_x1+=8;
                        bg_x2+=4;
                        bg_x3+=2;
                    } else if(mouse.x < 200){
                        bg_x1+=16;
                        bg_x2+=8;
                        bg_x3+=4;
                    }
                }
                if(mouse.x > (canvas.width/2)){
                    if(mouse.x > 450 && mouse.x < 500){
                        bg_x1-=4;
                        bg_x2-=2;
                        bg_x3-=1;
                    } else if(mouse.x > 500 && mouse.x < 600) {
                        bg_x1-=8;
                        bg_x2-=4;
                        bg_x3-=2;
                    } else if(mouse.x > 600){
                        bg_x1-=16;
                        bg_x2-=8;
                        bg_x3-=4;
                    }
                }
                /*
                    For checking bounds of 
                    background and repeating it!
                */
                if(bg_x1 > 0){
                    bg_x1 = -4000;
                    bg_x2 = -2000;
                    bg_x3 = -1000;
                }
                if(bg_x1 < (0 - 4000)){
                    bg_x1 = 0;
                    bg_x2 = 0;
                    bg_x3 = 0;
                }
            }
        paintBackground();
        shipPaint();
        }
    }, 1000/ fps);
};

requestAnimationFrame(animate);

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
    context_bg.clearRect(0, 0, canvas.width, canvas.height);
}

function loadImages() {  
	backgroundImage1.onload;	  
	backgroundImage2.onload;	 
	backgroundImage3.onload;
	paintBackground();
}
	
function paintBackground() {
    context_bg.drawImage(backgroundImage3, bg_x3-1000, 0);
    context_bg.drawImage(backgroundImage3, bg_x3+1000, 0);
	context_bg.drawImage(backgroundImage3, bg_x3, 0);
    context_bg.drawImage(backgroundImage2, bg_x2-2000, 0);
    context_bg.drawImage(backgroundImage2, bg_x2+2000, 0);
	context_bg.drawImage(backgroundImage2, bg_x2, 0);
    context_bg.drawImage(backgroundImage1, bg_x1-4000, 0);
    context_bg.drawImage(backgroundImage1, bg_x1+4000, 0);
	context_bg.drawImage(backgroundImage1, bg_x1, 0);
}

shipImageLeft.onload= function(){

};
function paintShipLeft() {
	if(mouse.y < 475 && mouse.y > 25){
		imageY = mouse.y - 25;	
	}
	context.drawImage(shipImageLeft, (canvas.width/2) - 37, imageY, 75, 50);
}
shipImageRight.onload = function(){

};
function paintShipRight() {
	if(mouse.y < 475 && mouse.y > 25){
		imageY = mouse.y - 25;
	}
	context.drawImage(shipImageRight, (canvas.width/2) - 37, imageY, 75, 50);
}
function shipPaint() {
	clearCanvas();
	paintBackground();
	if(mouse.x < 400){
		paintShipLeft();
	}else{
		paintShipRight();
	}
}	

canvas.addEventListener('mousemove', function(evt) {
	mouse = getmouse(canvas, evt);
		shipPaint();
}, false);
