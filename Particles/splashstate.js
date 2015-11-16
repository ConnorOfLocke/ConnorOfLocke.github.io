var SplashState = function()
{
	this.prototype = BaseState;
	this.TimeSinceStart = 0;
}

SplashState.prototype.load = function()
{
	//document.write("Loading Splash y'all");
}

SplashState.prototype.unload = function()
{
	//document.write("Unloading a Splash y'all");
}

SplashState.prototype.update = function(dt)
{
	//document.write("Splash Updating");
	this.TimeSinceStart += dt;
	if (this.TimeSinceStart > 3.0)
	{
		SceneManager.pop();
	}
}

SplashState.prototype.draw = function(dt)
{
	context.fillStyle = "#aaa";		
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.font = "40pt Veranda";
	context.fillStyle = "#FF0";
	var width = context.measureText( "Partaculars using SIMD instructions").width;
	context.fillText("Partaculars using SIMD instructions", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2);
}