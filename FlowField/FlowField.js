 

 
 var FlowField = function()
 {
	this.vectors_x = [];
	this.vectors_y = [];
    
    this.values = [];
 }
 
 FlowField.prototype.Init = function(horiz_samples, vert_samples, width, height, detail, sample_offset_x, sample_offset_y, seed, octaves, persistance)
 {
	 this.horiz_samples = horiz_samples;
	 this.vert_samples = vert_samples;
     
     this.width = width;
     this.height = height;
	 
    octaves = Math.floor(octaves);
     
	for (var x = 0; x < horiz_samples; x++)
	{
		for (var y = 0; y < vert_samples; y++)
		{
			var vector_index = x * horiz_samples + y;
			//puts it as an angle
			var sample = octavePerlin(x * detail + sample_offset_x, y * detail  + sample_offset_y, seed, octaves, persistance);
			
			this.vectors_x[vector_index] = Math.cos(sample * 2 * Math.PI);
			this.vectors_y[vector_index] = Math.sin(sample * 2 * Math.PI);
            this.values[vector_index] = sample;
		}
	}
 }
 
 FlowField.prototype.getSampleAtPoint = function(x, y)
{
    var checkCoord_x = x % this.width;
    var checkCoord_y = y % this.height;
    
    checkCoord_x = checkCoord_x / this.width;
    checkCoord_y = checkCoord_y / this.height;
    
    checkCoord_x = Math.floor(checkCoord_x * this.horiz_samples);
    checkCoord_y = Math.floor(checkCoord_y * this.vert_samples);
    
    var index = checkCoord_x * this.horiz_samples + checkCoord_y;
   
    return [this.vectors_x[index], this.vectors_y[index]];
    
}
 
 FlowField.prototype.draw = function()
 {
	for (var i = 0; i < this.vectors_x.length; i++)
	{
		var x = i / this.horiz_samples;
		var y = i % this.vert_samples;
		
        var horiz_spacing =  this.width / this.horiz_samples;
        var vert_spacing =   this.height / this.vert_samples;
        
		context.save();
		context.beginPath();
            if (this.vectors_x[i] > 0 && this.vectors_y[i] > 0)
                context.strokeStyle = "#888888";
            else if(this.vectors_x[i] < 0 && this.vectors_y[i] > 0)
                context.strokeStyle = "#000088";
            else if (this.vectors_x[i] < 0 && this.vectors_y[i] < 0)
                context.strokeStyle = "#008800";
            else if (this.vectors_x[i] > 0 && this.vectors_y[i] < 0)
                context.strokeStyle = "#880000";
            
			//context.strokeStyle = "#FFFFFF";
            //context.strokeStyle = " rgb("   + Math.round(this.values[i] * 255)
            //                         + ", " + Math.round(this.values[i] * 255) 
            //                         + ", " + Math.round(this.values[i] * 255) + "  ) ";
            //                                
            //context.strokeStyle = " rgb("+ (Math.round(this.vectors_x[i] * 255)) + ","
            //                             + (Math.round(this.vectors_y[i] * 255)) + ", 0)";
			//context.strokeStyle =  "   linear-gradient(#FF0000, #0000FF)    -moz-linear-gradient(#FF0000, #0000FF) ";
            context.LineWidth = 5;
			context.moveTo( x * horiz_spacing,
                            y * vert_spacing);
			context.lineTo( this.vectors_x[i] * horiz_spacing * 0.5 + x * horiz_spacing,
                            this.vectors_y[i] * vert_spacing  * 0.5 + y * vert_spacing);
		context.stroke();
	}
 }
 