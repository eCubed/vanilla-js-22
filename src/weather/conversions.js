export const kelvinToCelsius = (kelvin) => Math.floor(kelvin - 273)
export const kelvinToFahrenheit = (kelvin) => Math.floor(celsiusToFahrenheit(kelvinToCelsius(kelvin)))
export const celsiusToFahrenheit = (celsius) => celsius * 9/5 + 32
export const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9