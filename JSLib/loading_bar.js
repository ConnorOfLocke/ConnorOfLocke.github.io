var LoadingBar = function()
{
    this.x = 0;
    this.y = 0;
    this.width = 10;
    this.height = 10;
    
    this.outline_colour = "#FFFFFF";
    this.back_colour = "#111111";
    this.fill_colour = "#FF0000";
    
    this.fill = 0.0;
    this.cur_fill = 0.0;
    
    this.change_speed = 2.0;
    this.change_timer = 0.0;
    
    this.onfillaction = null;  
}

LoadingBar.prototype.setfill = function(fill)
{
    this.fill = fill;
    this.change_timer = 0.0;
}

LoadingBar.prototype.update = function(dt)
{
    if (this.cur_fill !== this.fill)
    {
        this.change_timer += dt * this.change_speed;

        this.cur_fill = bounce(this.cur_fill, this.fill, this.change_timer);

        if (this.cur_fill === 1)
        {
            if (this.onfillaction !== null)
                this.onfillaction();
        }   
    }
}

LoadingBar.prototype.draw = function(context, screen_res_x, screen_res_y)
{
    context.save();
    //draw back
    context.fillStyle = this.back_colour;
    context.fillRect(this.x * screen_res_x, this.y * screen_res_y, this.width * screen_res_x, this.height * screen_res_y);
    
     //draw fill
    context.fillStyle = this.fill_colour;
    context.fillRect(this.x * screen_res_x, this.y * screen_res_y,
                     (this.width * this.cur_fill) * screen_res_x, this.height * screen_res_y);
   
    //draw outline
    var radius = 5 * screen_res_x;
    
    var x = this.x * screen_res_x;
    var y = this.y * screen_res_y;
    
    var width = this.width * screen_res_x;
    var height = this.height * screen_res_y;
    
    context.strokeStyle = this.outline_colour;
    context.beginPath();
        context.moveTo( x + radius,  y);
        context.lineTo( x +  width - radius,  y);
        context.quadraticCurveTo( x +  width,  y,  x +  width,  y +  radius);
        context.lineTo( x +  width,  y +  height - radius);
        context.quadraticCurveTo( x +  width,  y +  height,  x +  width - radius,  y +  height);
        context.lineTo( x + radius,  y +  height);
        context.quadraticCurveTo( x,  y +  height,  x,  y +  height - radius);
        context.lineTo( x,  y + radius);
        context.quadraticCurveTo( x,  y,  x + radius,  y);
        context.closePath();
    context.stroke();

    context.restore();
    
    
    
}