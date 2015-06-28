var MOUSE_UP = 0;
var MOUSE_DOWN = 1;

var Mouse = function()
{
	this.mouseState = MOUSE_UP;
	
	this.x = 0;
	this.y = 0;
	
	var self = this;
	
	window.addEventListener('mousemove', function(evt) { self.mouseMove(evt);});
	window.addEventListener('mousedown', function(evt) { self.mouseDown(evt);});
	window.addEventListener('mouseup',	 function(evt) { self.mouseUp(evt);});
}

Mouse.prototype.mouseMove = function(evt)
{
	var rect = canvas.getBoundingClientRect();
	
	this.x = evt.clientX - rect.left;
	this.y = evt.clientY - rect.top;
}

Mouse.prototype.mouseDown = function(evt)
{
	var rect = canvas.getBoundingClientRect();
	
	this.x = evt.clientX - rect.left;
	this.y = evt.clientY - rect.top;
	
	this.mouseState = MOUSE_DOWN;
}
Mouse.prototype.mouseUp = function(evt)
{
	var rect = canvas.getBoundingClientRect();
	
	this.x = evt.clientX - rect.left;
	this.y = evt.clientY - rect.top;
	
	this.mouseState = MOUSE_UP;
}

Mouse.prototype.getX = function()
{
	return this.x;
}

Mouse.prototype.getY = function()
{
	return this.y;
}

Mouse.prototype.getMouseState = function()
{
	return this.mouseState;
}