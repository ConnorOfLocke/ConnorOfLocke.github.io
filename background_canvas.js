var canvas = document.getElementById("background_canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

window.onresize = function() 
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.onresize();

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
var timeSinceStart = 0.0;

function getDeltaTime()
{
    endFrameMillis = startFrameMillis;
    startFrameMillis = Date.now();
    
    var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
    
    if(deltaTime > 1)
        deltaTime = 1;
    
    return deltaTime;
}

var num_particles = 100;
var max_life_time = 3.0;
var min_life_time = 1.0;
var emit_rate = 0.1;
var max_particle_speed = 10.0;
var wind_speed = 2.0;
var perlin_input = 0.0;

var back_particles = new Array(num_particles);
for (var i = 0; i < num_particles; i++)
{
    back_particles[i] = {
        x : 0,
        y : 0,
        vel_x : 0,
        vel_y : 0,
        lifetime : 0
    };
}
var pixel_image = document.createElement("img");
pixel_image.src = "Particles/Particle.png";

var emit_timer = 0;
var cur_particle_index = 0;

function update()
{
    //context.globalCompositeOperation = "source-out";
    context.globalAlpha = 0.5;
    context.fillStyle = "#06000a";
    context.fillRect(0,0, canvas.width, canvas.height);
    
    var dt = getDeltaTime();
    emit_timer += dt;
    
    //emit
    while (emit_timer > emit_rate)
    {
        back_particles[cur_particle_index].x = random(0, canvas.width);
        back_particles[cur_particle_index].y = random(0, canvas.height);
        var vel_x = random(-100, 100);
        var vel_y = random(-100, 100);
        var magnitude = Math.sqrt(vel_x * vel_x + vel_y * vel_y);
        if (magnitude !== 0)
        {
            back_particles[cur_particle_index].vel_x = vel_x / magnitude;
            back_particles[cur_particle_index].vel_y = vel_y / magnitude;
        }
        else
        {
            back_particles[cur_particle_index].vel_x = 0;
            back_particles[cur_particle_index].vel_y = 1;
        }
        back_particles[cur_particle_index].lifetime = random(min_life_time, max_life_time);
        
        cur_particle_index++
        if (cur_particle_index === num_particles)
            cur_particle_index = 0;
        emit_timer -= emit_rate;
     }
    
    //get a smoothed wind direction vector
    var time = Date.now();
    var perlin_sample = octavePerlin(perlin_input * 0.1, perlin_input + 10 * 100 * 0.1, 10,  2, 0.5);
    var wind_x = Math.cos(perlin_sample * 2 * Math.PI);
    var wind_y = Math.sin(perlin_sample * 2 * Math.PI);
    
    perlin_input += dt * 0.01;
    //draw te ocean
    context.save();
    context.fillStyle = "#2a0042";
    context.fillRect(0, canvas.height - (canvas.height / 1920) * (180  + 10 * Math.sin(new Date().getTime() * 0.002)), canvas.width, 1000);
    context.fillStyle = "#190031";    
    context.fillRect(0, canvas.height - (canvas.height / 1920) * (200  + 10 * Math.sin(new Date().getTime() * 0.001)), canvas.width, 1000);
    context.restore();
   
    //update and draw
    for (var i = 0; i < num_particles; i++)
    {
        if (back_particles[i].lifetime > 0)
        {
            var life_left = back_particles[i].lifetime / max_life_time;
            var speed = life_left * max_particle_speed;
            back_particles[i].x += back_particles[i].vel_x * speed * dt;
            back_particles[i].y += back_particles[i].vel_y * speed * dt;
            
            back_particles[i].vel_x += wind_x * wind_speed * dt;
            back_particles[i].vel_y += wind_y * wind_speed * dt;
            
            back_particles[i].lifetime -= dt;
            
           context.save();
                context.globalAlpha = (life_left > 0.5) ? (1 - (life_left - 0.5)) * 2  : life_left * 2;
                context.fillStyle = "#ffd700";
                context.fillRect(back_particles[i].x, back_particles[i].y, 5, 5);
                //context.translate(back_particles[i].x, back_particles[i].y);
                //context.drawImage(pixel_image, back_particles[i].x, back_particles[i].y);
            context.restore();
        }
    }

    //draw the mountains
    context.save();
        context.globalAlpha = 1.0;    
        context.fillStyle = "#2a0042";
        context.beginPath();
        context.arc(canvas.width, (canvas.height / 1920) * (1920 + 450), (canvas.height / 1920) * (1000), 0, Math.PI * 2.0);
    context.fill();
    
    context.save();
        context.globalAlpha = 1.0;
        context.fillStyle = "#4a0075";
        context.beginPath();
        context.arc(0, (canvas.height / 1920) * (1920 + 500), (canvas.height / 1920) * (800), 0, Math.PI * 2.0);
    context.fill();
    

}

//sets the callback neeeded to update the scene
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(update);
