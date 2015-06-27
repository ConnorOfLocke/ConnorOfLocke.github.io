var GameState = function()
{
	this.prototype = BaseState;
	
	this.FlowFieldApple = new FlowField();
	this.FlowFieldApple.Init(50, 50, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0, 12, 6, 0.4); 
    
    this.Timer = 0.0;
}

GameState.prototype.load = function()
{

}

GameState.prototype.unload = function()
{
	
}

GameState.prototype.update = function(dt)
{

    this.FlowFieldApple.Init(50, 50, SCREEN_WIDTH, SCREEN_HEIGHT, this.Timer, this.Timer, 12, 6, 0.4); 
    this.Timer += dt * 0.1;
    
    
}

GameState.prototype.draw = function(dt)
{
	context.fillStyle = "#000";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	this.FlowFieldApple.draw();
	
	context.font = "16pt Veranda";
	context.fillStyle = "#FF0";
	var width = context.measureText( "FLOWYNESS").width;
	context.fillText("FLOWYNESS", SCREEN_WIDTH/2 - width/2, 50);
}