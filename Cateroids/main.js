//First get access to our canvas object we've defined in our html
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

//sets a listener functions so we can get input from the player
window.addEventListener('keydown', function(evt) { onKeyDown(evt); }, false);
window.addEventListener('keyup', function(evt) { onKeyUp(evt); }, false);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//CONSTANTS
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

//All of speeds are in pixels/second
var ASTEROID_SPEED = 40;
var PLAYER_SPEED = 100;
var PLAYER_TURN_SPEED = 0.08;

var BULLET_SPEED = 200;
var BULLET_ROTATE_SPEED = 10;

var PLAYER_MAX_SPEED = 300;
var PLAYER_FRICTION = 5;

var ASTEROID_SPAWN_TIME = 0.2;

var PARTICLE_LIFE_TIME = 1;

//Constant values
var KEY_SPACE 	= 32;
var KEY_LEFT 	= 37;
var KEY_UP 		= 38;
var KEY_RIGHT	= 39;
var KEY_DOWN 	= 40;

//GAME_STATE CONSTANTS
var STATE_SPLASH    = 0;
var STATE_GAME      = 1;
var STATE_GAMEOVER  = 2;

var gameState = STATE_SPLASH;

//boolean variable to track of player shooten
var ShootDown      = false;

//MAGICAL SCORE TALLY
var PlayerScore = 0;

//ALL OUR VARIABLES
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Background Image for End Screen
var EndImage = document.createElement("img");
EndImage.src = "NopeCat.png";

//Background Image for Splash Screen
var SplashBackground = document.createElement("img");
SplashBackground.src = "splash_background.png";

/////////////////////////////////////////////////////////////////////////////////////////////////////
//
//Grass Tiles (Space in my Case)
var Grass = document.createElement("img");
Grass.src = "stars.png";
var Background = [];

for (var y = 0; y < 15; y++)
{
	Background[y] = [];
	for (var x = 0; x < 20; x++)
	{
		Background[y][x] = Grass;
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
//Player
var Player = 
{
	image : document.createElement("img"),
	x : SCREEN_WIDTH/2,
	y : SCREEN_HEIGHT/2,
	width : 93,
	height : 80,
	directionX: 0,
	directionY: 0,
	angularDirection: 0,
	rotation: 0,
	lives: 3,

	velocityX: 0,
	velocityY: 0,
	friction: 0.05
};
//sets the image for the player to use
Player.image.src = "ship.png";

//updates the player values and draws it to the screen
function PlayerRun(dt)
{       
	//Add to the velocity of the player
    if (Player.directionY != 0 || Player.directionX != 0)
	{
		var s = Math.sin(Player.rotation);
		var c = Math.cos(Player.rotation);
		var xDir = (Player.directionX * c) - (Player.directionY * s);
		var yDir = (Player.directionX * s) + (Player.directionY * c);
		Player.velocityX += xDir * PLAYER_SPEED;
		Player.velocityY += yDir * PLAYER_SPEED;
                
	}
    //adjusts out velocity by the player friction and Max Speed
    //then adds the velocity to the player x and y
	if (!(Player.velocityX == 0 && Player.velocityY == 0))
	{
        //first get the magnitude of out current velocity
		var Speed = Math.sqrt(Player.velocityX * Player.velocityX + Player.velocityY * Player.velocityY );

        //rounds to 0 if decreasing speed by friction
        //causes it to go negative
		if (Speed - PLAYER_FRICTION <= 0)
		{
			Player.velocityX = 0;
			Player.velocityY = 0;
		}
        //rounds original original velocity with magnitude of SPEED to PLAYER_MAX_SPEED
        //if it goes over it
        else if (Speed > PLAYER_MAX_SPEED)
        {
            var NormSpeedX = Player.velocityX / Speed;
			var NormSpeedY = Player.velocityY / Speed;
            
            var TopSpeedX = NormSpeedX * PLAYER_MAX_SPEED;
            var TopSpeedY = NormSpeedY * PLAYER_MAX_SPEED; 
            
            Player.velocityX = TopSpeedX;
			Player.velocityY = TopSpeedY;
        }
        //otherwise decreases our velocity by a vector of our direction with magnitude friction
		else
		{
			var NormSpeedX = Player.velocityX / Speed;
			var NormSpeedY = Player.velocityY / Speed;

			var FrictionX = NormSpeedX * PLAYER_FRICTION;
			var FrictionY = NormSpeedY * PLAYER_FRICTION;

			Player.velocityX -= FrictionX;
			Player.velocityY -= FrictionY;
		}
		//adds our calculated velocity
		Player.x += Player.velocityX * dt;
		Player.y += Player.velocityY * dt;
	}

	//Rotates the player
	Player.rotation += Player.angularDirection * PLAYER_TURN_SPEED;

    //wraps the player if he goes off screen
    if (Player.x + Player.width/2 < 0)
        Player.x = SCREEN_WIDTH + Player.width/2;
        
    else if (Player.x - Player.width/2 > SCREEN_WIDTH)
        Player.x = 0 - Player.width/2;
        
    if (Player.y + Player.height/2 < 0)
        Player.y = SCREEN_HEIGHT + Player.height/2;
        
    else if (Player.y - Player.height/2 > SCREEN_HEIGHT)
        Player.y = 0 - Player.height/2; 
    
	//checks the collisions with Asteroids
	for (var i = 0 ; i < Asteroids.length; i++)
	{
		//if the player hits an Asteroid, takes out one life and the Asteroid
		if (intersects(	Player.x - Player.width/2, Player.y - Player.height/2,
						Player.width, Player.height,
						Asteroids[i].x - Asteroids[i].width/2, Asteroids[i].y - Asteroids[i].height/2,
						Asteroids[i].width, Asteroids[i].height))
		{
			Player.lives -= 1;
			Asteroids.splice(i, 1);
		}
	}
	
	if (Player.lives <= 0)
		gameState = STATE_GAMEOVER;
	
	//draw the player adjusting player origin
	context.save();
		context.translate( Player.x, Player.y);
		context.rotate(Player.rotation);
		context.drawImage(Player.image, -Player.width/2, -Player.height/2);
	context.restore();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
//Asteroids
var Asteroids = [];
var AsteroidSpawnTimer = 0;

function spawnAsteroid()
{
	var type = rand(0 ,3);
	var newAsteroid = {};

	//gives the Asteroid large, medium or small depending on random number
	newAsteroid.image = document.createElement("img");
	if (type == 0)
	{
		newAsteroid.image.src = "cat_large.png";
		newAsteroid.width = 69;
		newAsteroid.height = 75;
	}
	if (type == 1)
	{
		newAsteroid.image.src = "cat_medium.png";
		newAsteroid.width = 40;
		newAsteroid.height = 50;
	}
	if (type == 2)
	{
		newAsteroid.image.src = "cat_small.png";
		newAsteroid.width = 22;
		newAsteroid.height = 20;
	}

    //Gives the Asteroid a random rotation and rotation speed between -1 and 1
    newAsteroid.rotation = 0;
    newAsteroid.rotateSpeed = (rand(1, 20) - 10) * 0.1;    

	//starts the Asteroid in the middle of the screen
	newAsteroid.x = SCREEN_WIDTH/2;
	newAsteroid.y = SCREEN_HEIGHT/2;

	//start with a random vector
	var dirX = rand(-10, 10);
	var dirY = rand(-10, 10);
	//normalises it
	var Magnitude = Math.sqrt(dirX * dirX + dirY * dirY);
	if (Magnitude != 0)
	{
		dirX *= 1/ Magnitude;
		dirY *= 1/ Magnitude;
	}

	//taking the random vector we move outwards from the centre of the screen
	//in that direction
	var movY = dirY * SCREEN_HEIGHT;
	var movX = dirX * SCREEN_WIDTH;

	//Actually moves the asteroid
	newAsteroid.x += movX;
	newAsteroid.y += movY;

	//puts it on course towards the centre of the screen by reversing the vector
	newAsteroid.velocityX = -dirX * ASTEROID_SPEED;
	newAsteroid.velocityY = -dirY * ASTEROID_SPEED;

	//finally adds the newAsteroid to our Asteroids Array
	Asteroids.push(newAsteroid);
}

function AsteroidsRun(dt)
{
    for (var i = 0; i < Asteroids.length; i++)
    {
        //moves teh Asteroid
        Asteroids[i].x += Asteroids[i].velocityX * dt;
        Asteroids[i].y += Asteroids[i].velocityY * dt ;

        //rotates teh Asteroid
        Asteroids[i].rotation += Asteroids[i].rotateSpeed * dt;

        //wraps teh Asteroid
        if (Asteroids[i].x + Asteroids[i].width/2 < 0)
            Asteroids[i].x = SCREEN_WIDTH + Asteroids[i].width/2;
        else if (Asteroids[i].x - Asteroids[i].width/2 > SCREEN_WIDTH)
            Asteroids.x = 0 - Asteroids[i].width/2;

        if (Asteroids[i].y + Asteroids[i].height/2 < 0)
            Asteroids[i].y = SCREEN_HEIGHT + Asteroids[i].height/2;
        else if (Asteroids[i].y - Asteroids[i].height/2 > SCREEN_HEIGHT)
            Asteroids[i].y = 0 - Asteroids[i].height/2;
            
        //Draws teh Asteroid
        context.save();
            context.translate( Asteroids[i].x, Asteroids[i].y);
            context.rotate(Asteroids[i].rotation);
            context.drawImage( Asteroids[i].image, -Asteroids[i].width/2, -Asteroids[i].height/2 );
        context.restore();
    }

    //spawns a new one every SECOND 
    AsteroidSpawnTimer += dt;
    if (AsteroidSpawnTimer >= ASTEROID_SPAWN_TIME)
    {
        AsteroidSpawnTimer = 0;
        spawnAsteroid();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Bullets
var Bullets = [];
var ShootTimer = 0;

//function fires a bullet in the direction the player is facing
function playerShoot()
{
    if (ShootTimer <= 0)
    {
        ShootTimer = 0.3;
        var Bullet = 
        {
            image : document.createElement("img"),
            x : Player.x,         //starts the bullet at the player coordinates
            y : Player.y,
            width : 32,
            height : 32,
            velocityX : 0,
            velocityY : 0,
			rotation : 0
        }
        Bullet.image.src = "Goldfish.png"

        //start off with a direction straight up
        var dirX = 0;
        var dirY = 1;

        //rotates said direction by player rotation
        var s = Math.sin(Player.rotation);
        var c = Math.cos(Player.rotation);
        var xVel = (dirX * c) - (dirY * s);
        var yVel = (dirX * s) + (dirY * c);

        //gives the bullet calculated velocity times it's speed
        Bullet.velocityX = xVel * BULLET_SPEED;
        Bullet.velocityY = yVel * BULLET_SPEED;

        Bullets.push(Bullet);
    }
}

//moves, checks for collision and draws out bullet array
function BulletRun(dt)
{
    if (ShootTimer > 0)
        ShootTimer -= dt;
    if (ShootDown)
       playerShoot();

    for (var i = 0; i < Bullets.length; i++)
	{
		Bullets[i].x += Bullets[i].velocityX * dt;
		Bullets[i].y += Bullets[i].velocityY * dt;
		Bullets[i].rotation += BULLET_ROTATE_SPEED * dt;

		context.save();
			context.translate(Bullets[i].x, Bullets[i].y);
			context.rotate(Bullets[i].rotation);
			context.drawImage(Bullets[i].image,
					- Bullets[i].width/2,
					- Bullets[i].height/2);
		context.restore();
		
		//checks if the Bullet is outside the screen
		if (Bullets[i].x > SCREEN_WIDTH || Bullets[i].x < 0 ||
			Bullets[i].y > SCREEN_HEIGHT || Bullets[i].y < 0)
		{
			Bullets.splice(i, 1); //removes it from out array
		}
		else //else checks if any of the bullets are hitting Asteroids
		{
			for (var j = 0; j < Asteroids.length; j++)
			{
				if ( intersects(
								Bullets[i].x, Bullets[i].y,
								Bullets[i].width, Bullets[i].height,
								Asteroids[j].x - Asteroids[j].width/2, Asteroids[j].y - Asteroids[j].height/2,
								Asteroids[j].width, Asteroids[j].height) )
				{ 
                    PlayerScore ++;
                    ParticleSpawn(Asteroids[j].x, Asteroids[j].y)
					//deletes the Bullet and the Asteroid
                    Bullets.splice(i,1);
					Asteroids.splice(j,1);
					break;
				}
			}
		}

	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Particles
var Particles = [];

//creates a particle at the specified coordinates that exists for PARTICLE_LIFE_TIME
function ParticleSpawn(ParticleX, ParticleY)
{
    var newParticle = {
        image : document.createElement("img"),
        x : ParticleX,
        y : ParticleY,
        width : 79,
        height : 40,
        lifetime : PARTICLE_LIFE_TIME,
    };
    newParticle.image.src = "boom.png";
    Particles.push(newParticle);
}

function ParticleRun(dt)
{
    for (var i = 0; i < Particles.length; i++)
    {
        //draws the particle
        context.save();
            context.translate(Particles[i].x, Particles[i].y);
            context.drawImage(Particles[i].image,
                    - Particles[i].width/2,
                    - Particles[i].height/2);
        context.restore();
    
        //decreases it's lifetime until 0, then deletes it from the array
        Particles[i].lifetime -= dt;
        if (Particles[i].lifetime < 0)
        {
            Particles.splice(i ,1);
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//Splash Screen Stuff
var AsteroidLogo = document.createElement("img");
AsteroidLogo.src = "Asteroids_arcade_logo.png";

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Misc Functions

//returns a random real value between floor and ceil
function rand(floor, ceil)
{
	return Math.floor( (Math.random() * (ceil - floor)) + floor );
}

//AABB Collision function
function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
{
	if ( 	y2 + h2 < y1 ||
			x2 + w2 < x1 ||
				x2 > x1 + w1 ||
				y2 > y1 + h1)
		return false;

	return true;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

//Function called when key is pressed down
function onKeyDown(event)
{
	if (event.keyCode == KEY_UP)
        Player.directionY = 1;
        
    //for my version you cannot move backwards for added challenge
	//if (event.keyCode == KEY_DOWN)
        //Player.directionY = -1;
	
	if (event.keyCode == KEY_LEFT)
		Player.angularDirection = -1;
	
	if (event.keyCode == KEY_RIGHT)
		Player.angularDirection = 1;
	
	if (event.keyCode == KEY_SPACE)
        ShootDown = true;
}

//Function called when key is released
function onKeyUp(event)
{
	if (event.keyCode == KEY_UP)
        Player.directionY = 0;
        
	if (event.keyCode == KEY_DOWN)
        Player.directionY = 0;

	if (event.keyCode == KEY_LEFT)
		Player.angularDirection = 0;
	
	if (event.keyCode == KEY_RIGHT)
		Player.angularDirection = 0;
    
    if (event.keyCode == KEY_SPACE)
        ShootDown = false;
}

//Here we define the variable that keeps track of the time between frames
var lastUpdate = Date.now();


var SplashTimer = 3;
function runSplash(dt)
{
	//counts down three seconds then switchs to the game
	SplashTimer -= dt;
	if (SplashTimer <= 0)
	{
		gameState = STATE_GAME;
        SplashTimer = 3;
		return;
	}
    context.drawImage( SplashBackground, 0,0); 
	context.drawImage( AsteroidLogo, SCREEN_WIDTH/2 - AsteroidLogo.width/2
								, 	SCREEN_HEIGHT * 0.75 - AsteroidLogo.height/2); 
}

function runGame(dt)
{
	//updates shoot timer
	if (ShootTimer > 0)
		ShootTimer -= dt;

	//draws our background tiles
	for (var y = 0; y < 15; y++)
	{
		for (var x = 0; x < 20; x++)
		{
			context.drawImage( Background[y][x],
							   x * 32, y * 32);
		}
	}
    
    //call all our various update functions
    PlayerRun(dt);
	AsteroidsRun(dt);
    BulletRun(dt);
    ParticleRun(dt);
    
    //draw the player score to the screen
    context.font = "18px Arial";
    var TextMeasure = context.measureText("Score: " + PlayerScore);
    context.fillText("Score: " + PlayerScore, SCREEN_WIDTH/5 - (TextMeasure.width/2), SCREEN_HEIGHT/2);
    
    //draw the player lives to the screen, makin them red if near 0
    TextMeasure = context.measureText("Lives: " + Player.lives);
    if (Player.lives <= 1)
        context.fillStyle = "#f55";
    context.fillText("Lives: " + Player.lives, SCREEN_WIDTH/5 - (TextMeasure.width/2), SCREEN_HEIGHT/2 + 20);
}

var EndTimer = 5;
function runEnd(dt)
{
    context.drawImage(EndImage, 0, 0);

    EndTimer -= dt;
    if (EndTimer < 0)
    {
        //resets gamestate
        gameState = STATE_SPLASH;
        EndTimer = 3;
        
        //clears all Asteroids, Bullets and Particles
        Asteroids = [];
        Bullets = [];
        Particles = [];
        
        //resets the player values 
        Player.x = SCREEN_WIDTH/2;
        Player.y = SCREEN_HEIGHT/2;
        Player.lives = 3;
        Player.velocityX = 0;
        Player.velocityY = 0;
        
        //finally resets score
        PlayerScore = 0;
        return;
        
    }
    
    context.fillStyle = "#fff";
    var TextMeasure = context.measureText("Final Score: " + PlayerScore);
    context.fillText("Final Score: " + PlayerScore, SCREEN_WIDTH/2 - (TextMeasure.width/2), SCREEN_HEIGHT * 0.12);
    
    
}

//callback function to run each frame
function run()
{
	//First we work out the difference in time between now and the last update
	//and chuck it into deltaTime
	var now = Date.now();
	var DeltaTime = (now - lastUpdate) * 0.001;
	lastUpdate = now;

	//Gray Background
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);

	//runs the current game state 
	switch (gameState)
	{
		case STATE_SPLASH:
			runSplash(DeltaTime);
			break;
		case STATE_GAME:
			runGame(DeltaTime);
			break;
		case STATE_GAMEOVER:
			runEnd(DeltaTime);
			break;
	}
};


//essentially a function that sets our callback function run() to be called every frame
//with handling of different browsers
(function() {
	var onEachFrame;
	if (window.requestAnimationFrame) 
	{
		onEachFrame = function(cb) 
		{
			var _cb = function() 
			{ 
				cb(); //ie or chrome
				window.requestAnimationFrame(_cb); 
			}
		_cb();
		};
	}
	else if (window.mozRequestAnimationFrame)
	{
		onEachFrame = function(cb) 
		{
			var _cb = function() 
			{ 
				cb();	//mozilla
				window.mozRequestAnimationFrame(_cb); 
			}
		_cb();
		};
	}
	else 
	{
		onEachFrame = function(cb) //any ol browser
		{
			setInterval(cb, 1000 / 60);
		}
	}
	window.onEachFrame = onEachFrame;
})();

//set the window to call our run function on each frame
window.onEachFrame(run);

///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////