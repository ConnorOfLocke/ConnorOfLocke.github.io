var GameState = function()
{
	this.prototype = BaseState;
	
	this.FlowFieldApple = new FlowField();
	this.FlowFieldApple.Init(10, 10, 0, 4, 0.5); 
	
}

GameState.prototype.load = function()
{

}

GameState.prototype.unload = function()
{
	
}

GameState.prototype.update = function(dt)
{

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