function bound(min, max, value)
{
    if (value < min)
        return min;
    if (value > max)
        return max;
    return value;
}

function lerp(min, max, value)
{
    if (value < 0)
        return min;
    if (value > 1)
        return max;
	return value * (max - min) + min;
}


function bounce(min, max, value)
{
    if (value <= 0)
        return min;
    if (value >= 1)
        return max;
  
    var returnValue;
    
    if (value < (1/2.75)) 
        returnValue = (7.5625 * value * value);
    else if (value < (2/2.75))
        returnValue = (7.5625*(value -= 1.5/2.75) * value + .75);
    else if (value < (2.5/2.75)) 
        returnValue = (7.5625*(value -= 2.25/2.75 ) * value + .9375);
    else
        returnValue = (7.5625 * ( value -= 2.625/2.75 ) * value + .984375);
        
    return returnValue * (max - min) + min;
}