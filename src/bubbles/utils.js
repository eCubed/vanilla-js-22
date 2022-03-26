export const generateRandomDecimalNumberInclusive = (min, max, decimalPlaces) => {
  var rand = Math.random() * (max - min + 1) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}