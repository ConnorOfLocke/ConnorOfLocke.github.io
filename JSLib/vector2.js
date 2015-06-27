
var Vector2 = function() {
	this.x = 0;
	this.y = 0;
};

Vector2.prototype.copy = function() {
	var newVector = new Vector2();
	newVector.x = this.x;
	newVector.y = this.y;
	return newVector;
};

Vector2.prototype.set = function(x, y) {
	this.x = x;
	this.y = y;
};

Vector2.prototype.zero = function() {
	this.x = 0;
	this.y = 0;
};

Vector2.prototype.normalize = function() {
	var magnitude = (this.x * this.x) + (this.y * this.y);
	if(magnitude != 0)
	{
		var oneOverMag = 1 / Math.sqrt(magnitude);
		this.x *= oneOverMag;
		this.y *= oneOverMag;
	}
};

Vector2.prototype.magnitude = function() {
	var magnitude = (this.x * this.x) + (this.y * this.y);
	if (magnitude != 0)
		return magnitude / Math.sqrt(magnitude);
	else
		return 0;
}

Vector2.prototype.add = function(v2) {
	this.x += v2.x;
	this.y += v2.y;
};

Vector2.prototype.subtract = function(v2) {
	this.x -= v2.x;
	this.y -= v2.y;
};

Vector2.prototype.multiplyScalar = function(f) {
	this.x *= f;
	this.y *= f;
};