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
	this.p_rotation_speed = [];
	this.p_life = [];
	this.p_maxLife = [];
	
	this.p_alpha = [];

	this.maxNumParticles = numParticles;
	this.elapsedEmissionTime = 0;
	this.currentMaxParticle = 0;
	
	//initialises all the particles
	for (var i = 0; i < (numParticles + (numParticles % 4) )/ 4; i++)
	{
		this.p_position_x[i] = new SIMD.Float32x4();
		this.p_position_y[i] = new SIMD.Float32x4();
		this.p_size_x[i] = new SIMD.Float32x4();
		this.p_size_y[i] = new SIMD.Float32x4();
		
		this.p_velocity_x[i] = new SIMD.Float32x4();
		this.p_velocity_y[i] = new SIMD.Float32x4();
		
		this.p_rotation[i] = new SIMD.Float32x4();
		this.p_rotation_speed[i] = new SIMD.Float32x4();
		
		this.p_life[i] = new SIMD.Float32x4();
		this.p_maxLife[i] = new SIMD.Float32x4();
		
		this.p_alpha[i] = new SIMD.Float32x4(1,1,1,1);
	}
	
	this.position = new Vector2();
	this.position.set(PositionX, PositionY);
	
	this.emissionSize = new Vector2();
	this.emissionSize.set(5, 5);
	this.emissionRate = 10;
	
	this.minLife = 0.5;
	this.maxLife = 3.0;
	
	this.minRotaion = 0.0;
	this.maxRotation = 3.141;
	this.minRotation_speed = -3.141;
	this.maxRotation_speed = 3.141;
	
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
		
	var p_index = ((this.currentMaxParticle - this.currentMaxParticle % 4 )/ 4);
	
	if (this.currentMaxParticle % 4 === 0 )
	{
		this.p_position_x[p_index].x_ = this.position.x;
		this.p_position_y[p_index].x_ = this.position.y;
		
		this.p_size_x[p_index].x_ =  random(this.minSize, this.maxSize);
		this.p_size_y[p_index].x_ =  random(this.minSize, this.maxSize);
		
        //sets new velocity
		var newVelocity_x;
		var newVelocity_y;
		
		if (this.spawnDirection_x !== 0)
			newVelocity_x = this.spawnDirection_x;
		else
			newVelocity_x = random(-0.5, 0.5);
		
		if (this.spawnDirection_y !== 0)
			newVelocity_y = this.spawnDirection_y;
		else
			newVelocity_y = random(-0.5, 0.5);
		
		var magnitude = Math.sqrt(newVelocity_x * newVelocity_x  +  newVelocity_y  * newVelocity_y );
		if (magnitude != 0)
		{
			newVelocity_x /= magnitude;
			newVelocity_y /= magnitude;
		}
		var Speed = random( this.minVelocity, this.maxVelocity);
		newVelocity_x *= Speed;
		newVelocity_y *= Speed;
		
        this.p_velocity_x[p_index].x_ = newVelocity_x;
		this.p_velocity_y[p_index].x_ = newVelocity_y;
        
        
        this.p_rotation[p_index].x_ = random(this.minRotaion, this.maxRotation);
        this.p_rotation_speed[p_index].x_ = random( this.minRotation_speed, this.maxRotation_speed);
        
        this.p_life[p_index].x_ = random( this.minLife, this.maxLife);
		this.p_maxLife[p_index].x_ = this.p_life[p_index].x_;
		this.p_alpha[p_index].x_ = this.alpha;
	
	}
	else if (this.currentMaxParticle % 4 === 1 )
	{
		this.p_position_x[p_index].y_ = this.position.x;
		this.p_position_y[p_index].y_ = this.position.y;
		
		this.p_size_x[p_index].y_ =  random(this.minSize, this.maxSize);
		this.p_size_y[p_index].y_ =  random(this.minSize, this.maxSize);
		
        //sets new velocity
		var newVelocity_x;
		var newVelocity_y;
		
		if (this.spawnDirection_x !== 0)
			newVelocity_x = this.spawnDirection_x;
		else
			newVelocity_x = random(-0.5, 0.5);
		
		if (this.spawnDirection_y !== 0)
			newVelocity_y = this.spawnDirection_y;
		else
			newVelocity_y = random(-0.5, 0.5);
		
		var magnitude = Math.sqrt(newVelocity_x * newVelocity_x  +  newVelocity_y  * newVelocity_y );
		if (magnitude != 0)
		{
			newVelocity_x /= magnitude;
			newVelocity_y /= magnitude;
		}
		var Speed = random( this.minVelocity, this.maxVelocity);
		newVelocity_x *= Speed;
		newVelocity_y *= Speed;
		
        this.p_velocity_x[p_index].y_ = newVelocity_x;
		this.p_velocity_y[p_index].y_ = newVelocity_y;
        
        
        this.p_rotation[p_index].y_ = random(this.minRotaion, this.maxRotation);
        this.p_rotation_speed[p_index].y_ = random( this.minRotation_speed, this.maxRotation_speed);
        
        this.p_life[p_index].y_ = random( this.minLife, this.maxLife);
		this.p_maxLife[p_index].y_ = this.p_life[p_index].y_;
		this.p_alpha[p_index].y_ = this.alpha;
	}

	else if (this.currentMaxParticle % 4 === 2 )
	{
		this.p_position_x[p_index].z_ = this.position.x;
		this.p_position_y[p_index].z_ = this.position.y;
		
		this.p_size_x[p_index].z_ =  random(this.minSize, this.maxSize);
		this.p_size_y[p_index].z_ =  random(this.minSize, this.maxSize);
		
        //sets new velocity
		var newVelocity_x;
		var newVelocity_y;
		
		if (this.spawnDirection_x !== 0)
			newVelocity_x = this.spawnDirection_x;
		else
			newVelocity_x = random(-0.5, 0.5);
		
		if (this.spawnDirection_y !== 0)
			newVelocity_y = this.spawnDirection_y;
		else
			newVelocity_y = random(-0.5, 0.5);
		
		var magnitude = Math.sqrt(newVelocity_x * newVelocity_x  +  newVelocity_y  * newVelocity_y );
		if (magnitude != 0)
		{
			newVelocity_x /= magnitude;
			newVelocity_y /= magnitude;
		}
		var Speed = random( this.minVelocity, this.maxVelocity);
		newVelocity_x *= Speed;
		newVelocity_y *= Speed;
		
        this.p_velocity_x[p_index].z_ = newVelocity_x;
		this.p_velocity_y[p_index].z_ = newVelocity_y;
        
        
        this.p_rotation[p_index].z_ = random(this.minRotaion, this.maxRotation);
        this.p_rotation_speed[p_index].z_ = random( this.minRotation_speed, this.maxRotation_speed);
        
        this.p_life[p_index].z_ = random( this.minLife, this.maxLife);
		this.p_maxLife[p_index].z_ = this.p_life[p_index].z_;
		this.p_alpha[p_index].z_ = this.alpha;
	}

	else if (this.currentMaxParticle % 4 === 3 )		
	{
		this.p_position_x[p_index].w_ = this.position.x;
		this.p_position_y[p_index].w_ = this.position.y;
		
		this.p_size_x[p_index].w_ = random(this.minSize, this.maxSize);
		this.p_size_y[p_index].w_ = random(this.minSize, this.maxSize);
		
        //sets new velocity
		var newVelocity_x;
		var newVelocity_y;
		
		if (this.spawnDirection_x !== 0)
			newVelocity_x = this.spawnDirection_x;
		else
			newVelocity_x = random(-0.5, 0.5);
		
		if (this.spawnDirection_y !== 0)
			newVelocity_y = this.spawnDirection_y;
		else
			newVelocity_y = random(-0.5, 0.5);
		
		var magnitude = Math.sqrt(newVelocity_x * newVelocity_x  +  newVelocity_y  * newVelocity_y );
		if (magnitude != 0)
		{
			newVelocity_x /= magnitude;
			newVelocity_y /= magnitude;
		}
		var Speed = random( this.minVelocity, this.maxVelocity);
		newVelocity_x *= Speed;
		newVelocity_y *= Speed;
		
        this.p_velocity_x[p_index].w_ = newVelocity_x;
		this.p_velocity_y[p_index].w_ = newVelocity_y;
        
        
        this.p_rotation[p_index].w_ = random(this.minRotaion, this.maxRotation);
        this.p_rotation_speed[p_index].w_ = random( this.minRotation_speed, this.maxRotation_speed);
        
        this.p_life[p_index].w_ = random( this.minLife, this.maxLife);
		this.p_maxLife[p_index].w_ = this.p_life[p_index].w_;
		this.p_alpha[p_index].w_ = this.alpha;
	}
    
}

Emitter.prototype.update = function(dt)
{
	this.elapsedEmissionTime += dt;
	
	while( this.elapsedEmissionTime > (1.0 / this.emissionRate))
	{
		this.emit(dt);
		this.elapsedEmissionTime -= (1.0 / this.emissionRate);
	}
				
	var gravity_x = new SIMD.Float32x4(this.gravity_x, this.gravity_x, this.gravity_x, this.gravity_x);
	var gravity_y = new SIMD.Float32x4(this.gravity_y, this.gravity_y, this.gravity_y, this.gravity_y);
	
	var wind_x = new SIMD.Float32x4(this.wind_x, this.wind_x, this.wind_x, this.wind_x);
	var wind_y = new SIMD.Float32x4(this.wind_y, this.wind_y, this.wind_y, this.wind_y);
	
	var deltaTime = new SIMD.Float32x4(dt, dt, dt, dt);

	for (var i = 0 ; i < this.p_life.length; i++)
	{
        //SIMD.Int32x4 = SIMD.Int32x4.
        
        this.p_velocity_x[i] = new SIMD.Float32x4.add( this.p_velocity_x [i], gravity_x );
        this.p_velocity_y[i] = new SIMD.Float32x4.add( this.p_velocity_y [i], gravity_y );
        
        this.p_velocity_x[i] = new SIMD.Float32x4.add( this.p_velocity_x [i], wind_x );
        this.p_velocity_y[i] = new SIMD.Float32x4.add( this.p_velocity_y [i], wind_y );
        
        this.p_position_x[i] = new SIMD.Float32x4.add( this.p_position_x[i], this.p_velocity_x[i]);
        this.p_position_y[i] = new SIMD.Float32x4.add( this.p_position_y[i], this.p_velocity_y[i]);
        
        var rotationDelta = new SIMD.Float32x4.mul(this.p_rotation_speed[i], deltaTime);
        this.p_rotation[i] = new SIMD.Float32x4.add( this.p_rotation_speed[i], rotationDelta);
        
        this.p_life[i] = new SIMD.Float32x4.sub( this.p_life[i], deltaTime);
        this.p_alpha[i] = new SIMD.Float32x4.div(this.p_life[i] , this.p_maxLife[i]);
	}
}

Emitter.prototype.draw = function()
{
	for (var i = 0 ; i < this.p_life.length; i++)
	{
        //draws all the things from each chunk
      
		if (this.p_life[i].x_ > 0)
		{
			var origin_x = this.p_image.width / 2;
			var origin_y = this.p_image.height / 2;
			
			var scale_x = this.p_size_x[i].x_ / this.p_image.width;
			var scale_y = this.p_size_y[i].x_ / this.p_image.height;
			
			context.save();
				context.translate(this.p_position_x[i].x_, this.p_position_y[i].x_ );
				context.rotate(this.p_rotation[i].x_ );
				context.globalAlpha = this.p_alpha[i].x_;
				context.drawImage( this.p_image, origin_x * scale_x, origin_y * scale_y, this.p_size_x[i].x_, this.p_size_y[i].x_ );
			context.restore();
		}
        
        if (this.p_life[i].y_ > 0)
		{
			var origin_x = this.p_image.width / 2;
			var origin_y = this.p_image.height / 2;
			
			var scale_x = this.p_size_x[i].y_ / this.p_image.width;
			var scale_y = this.p_size_y[i].y_ / this.p_image.height;
			
			context.save();
				context.translate(this.p_position_x[i].y_ , this.p_position_y[i].y_ );
				context.rotate(this.p_rotation[i].y_ );
				context.globalAlpha = this.p_alpha[i].y_ ;
				context.drawImage( this.p_image, origin_x * scale_x, origin_y * scale_y, this.p_size_x[i].y_ , this.p_size_y[i].y_ );
			context.restore();
		}
        
        if (this.p_life[i].z_ > 0)
		{
			var origin_x = this.p_image.width / 2;
			var origin_y = this.p_image.height / 2;
			
			var scale_x = this.p_size_x[i].z_ / this.p_image.width;
			var scale_y = this.p_size_y[i].z_ / this.p_image.height;
			
			context.save();
				context.translate(this.p_position_x[i].z_, this.p_position_y[i].z_ );
				context.rotate(this.p_rotation[i].z_ );
				context.globalAlpha = this.p_alpha[i].z_ ;
				context.drawImage( this.p_image, origin_x * scale_x, origin_y * scale_y, this.p_size_x[i].z_ , this.p_size_y[i].z_ );
			context.restore();
		}
        
        if (this.p_life[i].w_ > 0)
		{
			var origin_x = this.p_image.width / 2;
			var origin_y = this.p_image.height / 2;
			
			var scale_x = this.p_size_x[i].w_ / this.p_image.width;
			var scale_y = this.p_size_y[i].w_ / this.p_image.height;
			
			context.save();
				context.translate(this.p_position_x[i].w_, this.p_position_y[i].w_ );
				context.rotate(this.p_rotation[i].w_ );
				context.globalAlpha = this.p_alpha[i].w_ ;
				context.drawImage( this.p_image, origin_x * scale_x, origin_y * scale_y, this.p_size_x[i].w_ , this.p_size_y[i].w_ );
			context.restore();
		}
	}	
}
