var GameState = function()
{
	this.prototype = BaseState;
	
	this.FlowFieldExample = new FlowField();
	this.FlowFieldExample.Init(20, 20, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0, 12, 3, 0.2); 
    
    this.FlowActors = [];
    for (var i = 0; i < 20; i++)
    {
        this.FlowActors[i] = new Actor(i * 15, i * 15, 200);
    }
    
    
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

    if (input.isKeyDown(input.KEY_SPACE))
    {
        this.Timer += dt * 0.1;
        this.FlowFieldExample.Init(20, 20, SCREEN_WIDTH, SCREEN_HEIGHT, this.Timer, this.Timer, 12, 3, 0.2); 
    }
    
    
    for (var i = 0; i < this.FlowActors.length; i++)
    {
        this.FlowActors[i].update(dt);
        
        //adds the vector at flowfield point
        var actor_x = this.FlowActors[i].position_x;
        var actor_y = this.FlowActors[i].position_y;
        
        var sample = this.FlowFieldExample.getSampleAtPoint(actor_x, actor_y);
    
        this.FlowActors[i].velocity_x += sample[0] * 2000;
        this.FlowActors[i].velocity_y += sample[1] * 2000;
    }

}

GameState.prototype.draw = function(dt)
{
	context.fillStyle = "#000";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	this.FlowFieldExample.draw();
	for (var i = 0; i < this.FlowActors.length; i++)
    {
        this.FlowActors[i].draw();
    }
    
	context.font = "16pt Veranda";
	context.fillStyle = "#FF0";
	var width = context.measureText( "FLOWYNESS").width;
	context.fillText("FLOWYNESS", SCREEN_WIDTH/2 - width/2, 50);
}