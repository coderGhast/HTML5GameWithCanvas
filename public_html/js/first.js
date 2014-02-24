var canvas = document.getElementById('canvas_object');
var context = canvas.getContext('2d');
var	shipImageLeft = new Image();
shipImageLeft.src = "img/player_ship_l.png";
var shipImageRight = new Image();
shipImageRight.src = "img/player_ship_r.png";

var mousePos;
var imageY;

var mouseTracking = false;

var bg_offset;

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
	if(mouseTracking){  
		if(mousePos.x != null){
			if(mousePos.x < 370){
				if(bg_x1 < 300){ //Restrict movement to rectangle
					bg_x1+=10;
					bg_x2+=5;
					bg_x3+=2;
				}
			}
			if(mousePos.x > 430) {
				if(bg_x1 > -7500){ //Restrict movement to rectangle
					bg_x1-=10;
					bg_x2-=5;
					bg_x3-=2;
				}
			}
		}
		
		paintBackground();
		shipPaint();
	}
	requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function loadImages() {  
	backgroundImage1.onload;	  
	backgroundImage2.onload;	 
	backgroundImage3.onload;
	paintBackground();
}
	
function paintBackground() {
   context.translate(-bg_offset, 0);

	context.drawImage(backgroundImage3, bg_x3, 0);
	context.drawImage(backgroundImage3, bg_x3 + 1000, 0);
	context.drawImage(backgroundImage2, bg_x2, 0);
	context.drawImage(backgroundImage2, bg_x2 + 2000, 0);
	context.drawImage(backgroundImage1, bg_x1, 0);
	context.drawImage(backgroundImage1, bg_x1 + 4000, 0);

   //context.translate(bg_offset, 0);
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