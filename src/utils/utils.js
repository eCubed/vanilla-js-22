export const generateRandomDecimalNumberInclusive = (min, max, decimalPlaces) => {
  var rand = Math.random() * (max - min + 1) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}

export const clamp = (min, max, v) => {
  if (v < min)
    return min
  else if (v > max)
    return max
  else
    return v
}

/*
export const clampIncrement = (min, max, v, increment) => {
  if (v + increment > max)
    return 
}
*/