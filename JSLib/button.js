var BUTTON_STATE_NORMAL = 0;
var BUTTON_STATE_HOVER = 1;
var BUTTON_STATE_DOWN = 2;
var BUTTON_STATE_DISABLED = 3;

var Button = function(image_normal_file, image_hover_file, image_down_file, image_disabled_file, text)
{
	this.x = 0;
	this.y = 0;
	
    this.state = BUTTON_STATE_NORMAL;
    
    this.onclickaction = null;
    
	this.image_normal = document.createElement("img");
    this.image_hover = document.createElement("img");
    this.image_down = document.createElement("img");
    this.image_disabled = document.createElement("img");
    
	this.image_normal.src = image_normal_file;
    this.image_hover.src = image_hover_file;
    this.image_down.src = image_down_file;
    this.image_disabled.src = image_disabled_file; 

    var self = this;
    this.image_normal.onload = (function() {self.assets_loaded += 0.25;});
    this.image_hover.onload = (function() {self.assets_loaded += 0.25;});
    this.image_down.onload = (function() {self.assets_loaded += 0.25;});
    this.image_disabled.onload = (function() {self.assets_loaded += 0.25;});
    
    this.text = text;
    
    this.assets_loaded = 0.0;
}

Button.prototype.checkState = function(deltaTime, mouse, screen_scale_x, screen_scale_y)
{    
    if (this.state !== BUTTON_STATE_DISABLED)
    {
        var mouse_x = mouse.getX();
        var mouse_y = mouse.getY();
        
        if (this.x * screen_scale_x < mouse_x &&
            mouse_x < this.x * screen_scale_x + this.image_normal.width * screen_scale_x &&
            this.y * screen_scale_y < mouse_y &&
            mouse_y < this.y * screen_scale_y + this.image_normal.height * screen_scale_y)
        {

            if (mouse.getMouseState())
                this.state = BUTTON_STATE_DOWN;
            else if (this.state === BUTTON_STATE_DOWN)
            {
                this.state = BUTTON_STATE_HOVER;
                if (this.onclickaction !== null)
                    this.onclickaction();
            }
            else
                this.state = BUTTON_STATE_HOVER;
        }
        else if (this.state === BUTTON_STATE_HOVER)
            this.state = BUTTON_STATE_NORMAL;
    }
}

Button.prototype.draw = function(context, screen_scale_x, screen_scale_y)
{
    context.save()
    if (this.state == BUTTON_STATE_NORMAL)
        context.drawImage(this.image_normal, this.x * screen_scale_x, this.y * screen_scale_y, this.image_normal.width * screen_scale_x, this.image_normal.height * screen_scale_y);
    else if (this.state == BUTTON_STATE_HOVER)
        context.drawImage(this.image_hover, this.x * screen_scale_x, this.y * screen_scale_y, this.image_hover.width * screen_scale_x, this.image_hover.height * screen_scale_y);
    else if (this.state == BUTTON_STATE_DOWN)
        context.drawImage(this.image_down, this.x * screen_scale_x, this.y * screen_scale_y, this.image_down.width * screen_scale_x, this.image_down.height * screen_scale_y);
    else if  (this.state == BUTTON_STATE_DISABLED)
        context.drawImage(this.image_disabled, this.x * screen_scale_x, this.y * screen_scale_y, this.image_disabled.width * screen_scale_x, this.image_disabled.height * screen_scale_y);
    
    context.font = (32 * screen_scale_x).toString() + "px Lato";
    context.fillStyle = "#FFFFFF";
    
    context.fillText(this.text, this.x * screen_scale_x, (this.y + 32) * screen_scale_y);
    //context.fillRect(this.x * screen_scale_x, this.y * screen_scale_y, this.image_normal.width * screen_scale_x, this.image_normal.height * screen_scale_y);

     //sans-serif;"
    context.restore();
}








