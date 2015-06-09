function random(min, max)
{
	return min + (max - min) * Math.random();
}

//https://www.dropbox.com/s/wiuded31j5qn8th/Scene_Manager_Example.zip?dl=0

//var Particle = function(imageFilename)
//{
//	this.position = new Vector2();
//	this.size = new Vector2();
//	
//	this.image = document.createElement("img");
//	this.image.src = imageFilename;
//	
//	this.velocity = new Vector2();
//	this.acceleration = new Vector2();
//	
//	this.rotation = 0;
//	this.life = 0;
//	
//	this.alpha = 0;
//}

var Emitter = function(imageFilename, PositionX, PositionY, numParticles)
{
	//for rilly rilly fast computation splits each part of the particle struct into arrays
	this.p_position_x = [];
	this.p_position_y = [];
	this.p_size_x = [];
	this.p_size_y = [];
	
	this.p_image = document.createElement("img");
	this.p_image.src = imageFilename;
	
	this.p_velocity_x = [];
	this.p_velocity_y = [];
	
	this.p_rotation = [];
	this.p_life = [];
	this.p_maxLife = [];
	
	this.p_alpha = [];

	this.maxNumParticles = numParticles;
	this.elapsedEmissionTime = 0;
	this.currentMaxParticle = 0;
	
	//initialises all the particles
	for (var i = 0; i < numParticles; i++)
	{
		this.p_position_x[i] = 0;
		this.p_position_y[i] = 0;
		this.p_size_x[i] = 0;
		this.p_size_y[i] = 0;
		
		this.p_velocity_x[i] = 0;
		this.p_velocity_y[i] = 0;
		
		this.p_rotation[i] = 0;
		this.p_life[i] = 0;
		this.p_maxLife[i] = 0;
		
		this.p_alpha[i] = 1;
	}
	
	this.position = new Vector2();
	this.position.set(PositionX, PositionY);
	
	this.emissionSize = new Vector2();
	this.emissionSize.set(5, 5);
	this.emissionRate = 10;
	
	this.minLife = 0.5;
	this.maxLife = 3.0;
	
	this.minSize = 8;
	this.maxSize = 32;
	
	this.minVelocity = -100;
	this.maxVelocity = 100;
	
	this.spawnDirection_x = 0;
	this.spawnDirection_y = 0;
	
	this.gravity_x = 0;
	this.gravity_y = 9.8;
	
	this.wind_x = 0;
	this.wind_y = 0;
	
	this.alpha = 1.0;
}

Emitter.prototype.emit = function(dt)
{
	this.currentMaxParticle ++;
	
	if (this.currentMaxParticle > this.maxNumParticles - 1)
		this.currentMaxParticle = 0;
		
	//set position and size
	this.p_position_x[this.currentMaxParticle] = this.position.x;
	this.p_position_y[this.currentMaxParticle] = this.position.y;
	
	this.p_size_x[this.currentMaxParticle] =  random(this.minSize, this.maxSize);
	this.p_size_y[this.currentMaxParticle] =  random(this.minSize, this.maxSize);
	
	if (this.spawnDirection_x !== 0)
	
	this.p_velocity_x[this.currentMaxParticle] = this.spawnDirection_x;
	
	if (this.spawnDirection_y !== 0)
	{
		this.p_velocity_x[this.currentMaxParticle] = random(-0.5, 0.5);
		this.p_velocity_y[this.currentMaxParticle] = this.spawnDirection_y;
	}
	if (this.spawnDirection_x !== 0)
	{
		this.p_velocity_x[this.currentMaxParticle] = this.spawnDirection_x;
		this.p_velocity_y[this.currentMaxParticle] += random(-0.5, 0.5);

	}
	if (this.spawnDirection_x === 0 && this.spawnDirection_y === 0)
	{
		//set random direction, normalize it, multiply by new velocity
		this.p_velocity_x[this.currentMaxParticle] = random(-1, 1);
		this.p_velocity_y[this.currentMaxParticle] = random(-1, 1);
	}

	var magnitude = Math.sqrt(this.p_velocity_x[this.currentMaxParticle] * this.p_velocity_x[this.currentMaxParticle]  +   this.p_velocity_y[this.currentMaxParticle] * this.p_velocity_y[this.currentMaxParticle]);
	if (magnitude != 0)
	{
		this.p_velocity_x[this.currentMaxParticle] /= magnitude;
		this.p_velocity_y[this.currentMaxParticle] /= magnitude;
	}
	var newVelocity = random( this.minVelocity, this.maxVelocity);
	this.p_velocity_x[this.currentMaxParticle] *= newVelocity;
	this.p_velocity_y[this.currentMaxParticle] *= newVelocity;
		
	//this.p_rotation[this.currentMaxParticle] = 0;
	this.p_life[this.currentMaxParticle] = random( this.minLife, this.maxLife);
	this.p_maxLife[this.currentMaxParticle] = this.p_life[this.currentMaxParticle];
	this.p_alpha[this.currentMaxParticle] = this.alpha;
}

Emitter.prototype.update = function(dt)
{
	this.elapsedEmissionTime += dt;
	
	while( this.elapsedEmissionTime > (1.0 / this.emissionRate))
	{
		this.emit(dt);
		this.elapsedEmissionTime -= (1.0 / this.emissionRate);
	}
	
	for (var i = 0 ; i < this.p_life.length; i++)
	{
		if (this.p_life[i] > 0)
		{
			this.p_life[i] -= dt;
			
			this.p_velocity_x[i] += this.gravity_x;
			this.p_velocity_y[i] += this.gravity_y;
			
			this.p_velocity_x[i] += this.wind_x;
			this.p_velocity_y[i] += this.wind_y;
			
			this.p_position_x[i] += this.p_velocity_x[i] * dt;
			this.p_position_y[i] += this.p_velocity_y[i] * dt;
			
			this.p_alpha[i] = this.p_life[i] / this.p_maxLife[i];
		}
	}
}

Emitter.prototype.draw = function()
{
	for (var i = 0 ; i < this.p_life.length; i++)
	{
		if (this.p_life[i] > 0)
		{
			var origin_x = this.p_image.width / 2;
			var origin_y = this.p_image.height / 2;
			
			var scale_x = this.p_size_x[i] / this.p_image.width;
			var scale_y = this.p_size_y[i] / this.p_image.height;
			
			context.save();
				context.translate(this.p_position_x[i], this.p_position_y[i]);
				context.rotate(this.p_rotation[i]);
				context.globalAlpha = this.p_alpha[i];
				context.drawImage( this.p_image, origin_x * scale_x, origin_y * scale_y, this.p_size_x[i], this.p_size_y[i]);
			context.restore();
		}
	}	
}
