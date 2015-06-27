
var StateStack = function()
{
	this.states = [];
}

StateStack.prototype.push = function( state )
{
	state.load();
	this.states.push(state);
}	

StateStack.prototype.pop = function()
{
	this.states[ this.states.length - 1].unload();
	this.states.pop();
}	

StateStack.prototype.switchState = function( state )
{
	if (this.states.length !== 1)
		his.states[ this.states.length - 1].unload();
		
	this.states.pop();
	state.load();
	this.states.push(state);
}

StateStack.prototype.getTop = function()
{
	if (this.states.length == 0)
		return null;

	return this.states[ this.states.length - 1];
}

StateStack.prototype.update = function(dt)
{
	if (this.states.length == 0)
	{
		window.alert("Cannot update state - StatePool Empty");
		return;
	}
	
	this.states[this.states.length - 1].update(dt);
}

StateStack.prototype.draw = function()
{
	if (this.states.length == 0)
	{
		window.alert("Cannot draw state - StatePool Empty");
		return;
	}
	
	this.states[this.states.length - 1].draw();
}