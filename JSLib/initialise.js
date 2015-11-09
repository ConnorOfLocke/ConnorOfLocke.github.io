var canvas = document.getElementById("menu_canvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var real_screen_height = window.innerHeight;
canvas.width = SCREEN_WIDTH / SCREEN_HEIGHT * real_screen_height;
canvas.height = real_screen_height;

var screen_scale_x = canvas.width / SCREEN_WIDTH;
var screen_scale_y = canvas.height / SCREEN_HEIGHT;

window.onresize = function() 
{
	real_screen_height = window.innerHeight;	

	canvas.width = SCREEN_WIDTH / SCREEN_HEIGHT * real_screen_height;
	canvas.height = real_screen_height;

	screen_scale_x = canvas.width / SCREEN_WIDTH;
	screen_scale_y = canvas.height / SCREEN_HEIGHT;
};

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var timeSinceStart = 0.0;

function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    
    if(deltaTime > 1)
        deltaTime = 1;
    
    return deltaTime;
}
