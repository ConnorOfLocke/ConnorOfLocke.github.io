var GameState = function()
{
	this.prototype = BaseState;
	
}

GameState.prototype.load = function()
{
	this.FireParticles = new Emitter("fire.png" , SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 1000);
	this.FireParticles.minSize = 32;
	this.FireParticles.maxSize = 32;
	this.FireParticles.minLife = 0.1;
	this.FireParticles.maxLife = 0.5;
	this.FireParticles.gravity_y = -0.5;
	this.FireParticles.wind_x = 0.1;
	this.FireParticles.spawnDirection_y = -1;
	this.FireParticles.minVelocity = 40;
	this.FireParticles.emissionRate = 100;
	
	this.SmokeParticles = new Emitter("smoke.png" , SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 1000);
	this.SmokeParticles.minSize = 32;
	this.SmokeParticles.maxSize = 32;
	this.SmokeParticles.minLife = 0.1;
	this.SmokeParticles.maxLife = 5;
	this.SmokeParticles.gravity_y = 0;
	this.SmokeParticles.wind_x = 0.5;
	this.SmokeParticles.spawnDirection_y = -1;
	this.SmokeParticles.minVelocity = 0;
	this.SmokeParticles.emissionRate = 50;
	
	//charcoaly bits
	this.charcoalParticles = new Emitter("charred.png" , SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 100);
	this.charcoalParticles.minSize = 16;
	this.charcoalParticles.maxSize = 16;
	this.charcoalParticles.minLife = 0.1;
	this.charcoalParticles.maxLife = 5;
	this.charcoalParticles.spawnDirection_y = -1;
	this.charcoalParticles.emissionRate = 3;
	this.mouseInput = new Mouse();
}

GameState.prototype.unload = function()
{
	
}

GameState.prototype.update = function(dt)
{
	this.FireParticles.position.x = this.mouseInput.getX() - this.FireParticles.maxSize;
	this.FireParticles.position.y = this.mouseInput.getY() - this.FireParticles.maxSize;
	
	this.SmokeParticles.position.x = this.mouseInput.getX() - this.SmokeParticles.maxSize;
	this.SmokeParticles.position.y = this.mouseInput.getY() - this.SmokeParticles.maxSize;
	
	this.charcoalParticles.position.x = this.mouseInput.getX() - this.charcoalParticles.maxSize;
	this.charcoalParticles.position.y = this.mouseInput.getY() - this.charcoalParticles.maxSize;
	
	this.SmokeParticles.update(dt);
	this.FireParticles.update(dt);	
	this.charcoalParticles.update(dt);
}

GameState.prototype.draw = function(dt)
{
	context.fillStyle = "#000";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	this.charcoalParticles.draw();
	this.SmokeParticles.draw();
	this.FireParticles.draw();

	//context.font = "32pt Veranda";
	//context.fillStyle = "#FF0";
	//var width = context.measureText( "Super Cool Flame").width;
	//context.fillText("Super Cool Flame", SCREEN_WIDTH/2 - width/2, 50);
}