var Actor = function(_x, _y, _max_speed)
{
    this.position_x = _x;
    this.position_y = _y;
    
    this.velocity_x = (Math.random() * 2 - 1 ) * 10;
    this.velocity_y = (Math.random() * 2 - 1 ) * 10;
    
    this.rotation = 0;
    
    this.max_speed = _max_speed;
    
    this.image = document.createElement("img");
    this.image.src = "banana.png";
};

Actor.prototype.update = function(dt)
{
    this.position_x += this.velocity_x * dt;
    this.position_x += this.velocity_y * dt;

    var cur_speed = (this.velocity_x * this.velocity_x + this.velocity_y * this.velocity_y);

    //normalises the speed to max_speed
    if (cur_speed > this.max_speed)
    {
        this.velocity_x /= cur_speed;
        this.velocity_y /= cur_speed;
        
        this.velocity_x *= this.max_speed;
        this.velocity_y *= this.max_speed;
    }
    
    //bounce off the sides
    if (this.position_x + this.image.width / 2.0 > SCREEN_WIDTH)
    {
        this.position_x = SCREEN_WIDTH - (this.image.width / 2.0);
        this.velocity_x  = this.velocity_x * 0.75; //reduce the bounce
    }
    else if (this.position_x - this.image.width / 2.0 < 0)
    {
        this.position_x = 0 + (this.image.width / 2.0);
        this.velocity_x  = this.velocity_x * 0.75; //reduce the bounce
    }
    
    if (this.position_y + this.image.height / 2.0 > SCREEN_HEIGHT)
    {
        this.position_y = SCREEN_HEIGHT - (this.image.height / 2.0);
        this.velocity_y = -this.velocity_y * 0.75;
    }
    else if (this.position_y - this.image.height / 2.0 < 0)
    {
        this.position_y = 0 + this.image.height / 2.0;
        this.velocity_y = -this.velocity_y * 0.75;
    }
    
    //update rotation
    this.rotation = Math.atan2(this.velocity_y, this.velocity_x);
    
};

Actor.prototype.draw = function()
{
    context.save();
        context.translate(this.position_x, this.position_y);
        context.rotate(this.rotation);
        context.drawImage( this.image, -this.image.width /2.0, -this.image.height / 2.0);
    context.restore();
}