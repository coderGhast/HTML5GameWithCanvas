var canvas = document.getElementById('canvas_main');
var context = canvas.getContext('2d');

var canvas_bg = document.getElementById('canvas_city_1');
var context_bg = canvas_bg.getContext('2d');

var	shipImageLeft = new Image();
shipImageLeft.src = "img/player_ship_l.png";
var shipImageRight = new Image();
shipImageRight.src = "img/player_ship_r.png";

var mousePos;
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
	  
function getMousePos(canvas, evt) {
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
            if(mousePos.x != null){
                if(mousePos.x < 400){
                    if(mousePos.x < 350 && mousePos.x > 300){
                        bg_x1+=4;
                        bg_x2+=2;
                        bg_x3+=1;
                    } else if(mousePos.x < 300 && mousePos.x > 200) {
                        bg_x1+=8;
                        bg_x2+=4;
                        bg_x3+=2;
                    } else if(mousePos.x < 200){
                        bg_x1+=16;
                        bg_x2+=8;
                        bg_x3+=4;
                    }
                }
                if(mousePos.x > 400){
                    if(mousePos.x > 450 && mousePos.x < 500){
                        bg_x1-=4;
                        bg_x2-=2;
                        bg_x3-=1;
                    } else if(mousePos.x > 500 && mousePos.x < 600) {
                        bg_x1-=8;
                        bg_x2-=4;
                        bg_x3-=2;
                    } else if(mousePos.x > 600){
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
/*
    EDIT: I made a mistake that made me think I was doing it wrong.
    HOWEVER.. Still maybe better practice to do this on other canvases.

    THIS MUST BE DONE USING DIFFERENT CANVASES!!
    Currently, each time another BG is drawn (so, let's
    say we reach the end and want to paint BG_3 again),
    it will be painting over our BG_2 and BG_1 if they have not yet been finished.
    Only other way to solve this would be through the use of images
    all of the same side when painted, perhaps.. Idk.. Yes.. 

    So, do them in different canvases. The drawing order/time
    can be the same, but it mainly affects the layering. Using
    z-index should make it work just fine. Try it now!
*/
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
	if(mousePos.y < 475 && mousePos.y > 25){
		imageY = mousePos.y - 25;	
	}
	context.drawImage(shipImageLeft, (canvas.width/2) - 37, imageY, 75, 50);
}
shipImageRight.onload = function(){

};
function paintShipRight() {
	if(mousePos.y < 475 && mousePos.y > 25){
		imageY = mousePos.y - 25;
	}
	context.drawImage(shipImageRight, (canvas.width/2) - 37, imageY, 75, 50);
}
function shipPaint() {
	clearCanvas();
	paintBackground();
	if(mousePos.x < 400){
		paintShipLeft();
	}else{
		paintShipRight();
	}
}	

canvas.addEventListener('mousemove', function(evt) {
	mousePos = getMousePos(canvas, evt);
		shipPaint();
}, false);
