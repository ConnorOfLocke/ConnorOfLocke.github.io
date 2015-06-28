var GameState = function()
{
	this.prototype = BaseState;
	
	this.FlowFieldExample = new FlowField();
	this.FlowFieldExample.Init(50, 50, SCREEN_WIDTH, SCREEN_HEIGHT, 0.1, 0, 0, 0, 5, 0.5); 
    
    this.FlowActors = [];
    var actorIndex = 0;
    for (var x = 0; x < 20; x++)
    {
        for (var y = 0; y < 20; y++)
        {
            this.FlowActors[actorIndex] = new Actor(x * (SCREEN_WIDTH /20.0), y * (SCREEN_HEIGHT / 20.0), Math.random() * 100000 + 1000 , "Particle.png");
            actorIndex++;
        }
    }
    
    this.destination_x = SCREEN_WIDTH / 2;
    this.destination_y = SCREEN_HEIGHT / 2;
    
    this.Timer = 0.0;
    this.Persistance = 0.5;
    this.Octaves = 5;
    this.Detail = 0.1;
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
        this.FlowFieldExample.Init(50, 50, SCREEN_WIDTH, SCREEN_HEIGHT, this.Detail, this.Timer, this.Timer, 0, this.Octaves, this.Persistance); 
    }
    
    if (input.isKeyDown(input.KEY_O))
    {
        this.Octaves += dt;
        if (this.Octaves > 10)
            this.Octaves = 1;
        
        this.FlowFieldExample.Init(50, 50, SCREEN_WIDTH, SCREEN_HEIGHT, this.Detail, this.Timer, this.Timer, 0, this.Octaves, this.Persistance);
    }
    
    if (input.isKeyDown(input.KEY_D))
    {
        this.Detail += dt;
        if (this.Detail > 20)
            this.Detail = 0.001;
        
        this.FlowFieldExample.Init(50, 50, SCREEN_WIDTH, SCREEN_HEIGHT, this.Detail, this.Timer, this.Timer, 0, this.Octaves, this.Persistance);    
    }
    
    if (input.isKeyDown(input.KEY_P))
    {
        this.Persistance += dt;
        if (this.Persistance > 10)
            this.Persistance = 0;
            
         this.FlowFieldExample.Init(50, 50, SCREEN_WIDTH, SCREEN_HEIGHT, this.Detail, this.Timer, this.Timer, 0, this.Octaves, this.Persistance); 
    }
    
    if (input.isKeyDown(input.KEY_R))
    {
        var actorIndex = 0;
        for (var x = 0; x < 20; x++)
        {
            for (var y = 0; y < 20; y++)
            {
                this.FlowActors[actorIndex].position_x = x * (SCREEN_WIDTH /20.0);
                this.FlowActors[actorIndex].position_y = y * (SCREEN_HEIGHT / 20.0);
                this.FlowActors[actorIndex].velocoty_x = 0;
                this.FlowActors[actorIndex].velocoty_y = 0;
                actorIndex++;
            }
        }
    }
    
    if (mouseInput.getMouseState())
    {
        var mouse_x = mouseInput.getX();
        var mouse_y = mouseInput.getY();
        
        for (var i = 0; i < this.FlowActors.length; i++)
        {
            this.FlowActors[i].destination_x = mouse_x;
            this.FlowActors[i].destination_y = mouse_y;
        }
        
        this.destination_x = mouse_x;
        this.destination_y = mouse_y;
    }
    
    
    //updates the boids
    for (var i = 0; i < this.FlowActors.length; i++)
    {
        this.FlowActors[i].update(dt);
        
        //adds the vector at flowfield point
        var actor_x = this.FlowActors[i].position_x;
        var actor_y = this.FlowActors[i].position_y;
        
        var sample = this.FlowFieldExample.getSampleAtPoint(actor_x, actor_y);
    
        this.FlowActors[i].velocity_x += sample[0] * 800 * dt;
        this.FlowActors[i].velocity_y += sample[1] * 800 * dt;
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
    
	context.font = "10pt Courier New";
    
    if (input.isKeyDown(input.KEY_P))
        context.fillStyle = "#F0F";
    else
        context.fillStyle = "#FF0";
    var Message1 = "'P' to change Persistance : " + this.Persistance;
    context.fillText(Message1, SCREEN_WIDTH/4, 20);
    
    
    if (input.isKeyDown(input.KEY_O))
        context.fillStyle = "#F0F";
    else
        context.fillStyle = "#FF0";
    var Message2 = "'O' to change Octaves :" + Math.floor(this.Octaves);
    context.fillText(Message2, SCREEN_WIDTH/4, 30);
    
    
    if (input.isKeyDown(input.KEY_R))
        context.fillStyle = "#F0F";
    else
        context.fillStyle = "#FF0";
    var Message3 = "'R' to reset Boids";
    context.fillText(Message3, SCREEN_WIDTH/4, 40);
    
    if (mouseInput.getMouseState())
        context.fillStyle = "#F0F";
    else
        context.fillStyle = "#FF0";
    var Message3 = "Left Click to set destination";
    context.fillText(Message3, SCREEN_WIDTH/4, 50);
   
    context.beginPath();
    context.strokeStyle = "#FF0";
    context.fillStyle = "#FF0";
    context.arc(this.destination_x, this.destination_y, 10, 0, 2*Math.PI);
    context.stroke();
    context.fill();

    
}