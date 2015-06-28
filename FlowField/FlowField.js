 
 var p = [ 151,160,137,91,90,15,                 // Hash lookup table as defined by Ken Perlin.  This is a randomly
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,    // arranged array of all numbers from 0-255 inclusive.
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,151,160,137,91,90,15,          
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,                     
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180,
];
 
 //apply the smoothing function 6t^5 - 15t^4 + 10t^3
 function fade(t)
 {
	return t * t * t * (t * (t * 6 - 15) + 10);
 }
 
 //calculates the dot product of a randomly selected vector
 function grad(hash, x, y, z)
 {
	switch(hash & 0xF)
    {
        case 0x0: return  x + y;
        case 0x1: return -x + y;
        case 0x2: return  x - y;
        case 0x3: return -x - y;
        case 0x4: return  x + z;
        case 0x5: return -x + z;
        case 0x6: return  x - z;
        case 0x7: return -x - z;
        case 0x8: return  y + z;
        case 0x9: return -y + z;
        case 0xA: return  y - z;
        case 0xB: return -y - z;
        case 0xC: return  y + x;
        case 0xD: return -y + z;
        case 0xE: return  y - x;
        case 0xF: return -y - z;
        default: return 0; // never happens
    }
 }
 
 function lerp(left, right, ratio)
 {
	 return left + ratio * (right - left);
 }
 
 function perlin(x,y,z)
 {
	 var xi = Math.floor(x);
	 var yi = Math.floor(y);
	 var zi = Math.floor(z);
	 
	 var xf = x - xi;
	 var yf = y - yi;
	 var zf = z - zi;
     
	 xi = xi % 255;
	 yi = yi % 255;
	 zi = zi % 255;
     
	 var u = fade(xf);
	 var v = fade(yf);
	 var w = fade(zf);
	 
	var aaa, aba, aab, abb, baa, bba, bab, bbb;
    aaa = p[p[p[    xi ] +     yi ] +     zi];
    aba = p[p[p[    xi ] + 1 + yi ] +     zi];
    aab = p[p[p[    xi ] +     yi ] + 1 + zi];
    abb = p[p[p[    xi ] + 1 + yi ] + 1 + zi];
    baa = p[p[p[1 + xi ] +     yi ] +     zi];
    bba = p[p[p[1 + xi ] + 1 + yi ] +     zi];
    bab = p[p[p[1 + xi ] +     yi ] + 1 + zi];
    bbb = p[p[p[1 + xi ] + 1 + yi ] + 1 + zi];
	 
	 
	var x1, x2, y1, y2;
    x1 = lerp(  grad (aaa, xf  , yf  , zf), 
                grad (baa, xf-1, yf  , zf),             
                u);                                    
    x2 = lerp(  grad (aba, xf  , yf-1, zf),           
                grad (bba, xf-1, yf-1, zf),            
                u);
                    
    y1 = lerp(x1, x2, v);

	
    x1 = lerp(   grad (aab, xf  , yf  , zf-1),
                 grad (bab, xf-1, yf  , zf-1),
                 u);
    x2 = lerp(   grad (abb, xf  , yf-1, zf-1),
                 grad (bbb, xf-1, yf-1, zf-1),
                 u);
    y2 = lerp (x1, x2, v);
    
    var finalreturn = lerp (y1, y2, w);  
    return finalreturn;
	 
 }
 
 function octavePerlin( x, y, seed, octaves, persistance)
 {
	var total = 0.0;
	var frequency = 1.0;
	var amplitude = 1.0;
	var maxValue = 0.0;
	
	for (var i = 0; i < octaves; i++)
	{
		total += perlin(x * frequency, y * frequency, seed * frequency) * amplitude;
		
		maxValue += amplitude;
		amplitude *= persistance;
		frequency *= 2.0;
	}
	var result = total / maxValue;
	return result;
 }
 
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
 