var BaseState = function()
{
	this.type = "BaseState";
}

BaseState.prototype.load = function()
{
	//document.write("Loading Basestate y'all");
}

BaseState.prototype.unload = function()
{
	//document.write("Unloading a BaseState y'all");
}

BaseState.prototype.update = function(dt)
{
	//document.write("BaseState Updating");
}

BaseState.prototype.draw = function(dt)
{
	context.font = "32pt Veranda";
	context.fillStyle = "#FF0";
	var width = context.measureText( "BASE STATE AHHHHHH").width;
	context.fillText("BASE STATE AHHHHHH", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2 );
}