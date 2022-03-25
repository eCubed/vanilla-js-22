import { API_KEY, API_ROOT, ICON_ROOT } from './constants.js'
import { kelvinToCelsius, kelvinToFahrenheit } from './conversions.js'

let isGranted = false
let unit = 'F'
let temperatureInKelvins = 0

const updateAppBasedOnIsGranted = () => {
  if (isGranted) {
    document.getElementById('display').style.display = 'block'
    document.getElementById('pending-message').style.display = 'none'
  } else {
    document.getElementById('display').style.display = 'none'
    document.getElementById('pending-message').style.display = 'block'
  }
}

const displayTemperature = () => {
  document.getElementById('temperature').innerText = (unit === 'F') 
    ? `${kelvinToFahrenheit(temperatureInKelvins)}°F`
    : `${kelvinToCelsius(temperatureInKelvins)}°C`
}

const displayWeather = (data) => {
  document.getElementById('city').innerText = data.name
  document.getElementById('icon').src = `${ICON_ROOT}${data.weather[0].icon}.png`
  displayTemperature(data.main.temp)
}

const getWeather = (latitude, longitude) => {
  console.log(`url: ${API_ROOT}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
  axios({
    method: 'get',
    url: `${API_ROOT}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  }).then(res => {
    temperatureInKelvins = res.data.main.temp
    displayWeather(res.data)
    isGranted = true;
    updateAppBasedOnIsGranted();
  })
}

const tryGetWeather = () => {
  navigator.permissions &&
  navigator.permissions.query({name: 'geolocation'}).then((res) => {
    console.log(`query permission: ${res.state}`)
    if('prompt' === res.state) {
        navigator.geolocation.getCurrentPosition((geoposition) => {
          console.log(JSON.stringify(geoposition.coords)) /* You can use this position without prompting the user if the permission had already been granted */
          getWeather(geoposition.coords.latitude, geoposition.coords.longitude)
          
        })
      }
  })
}

const initializeApp = () => {
  document.getElementById('get-weather-button').addEventListener('click', () => {
    console.log(`about to get weather`)    
    tryGetWeather()
  })

  document.getElementById('unit-toggler').addEventListener('click', () => {
    unit = (unit === 'F') ? 'C' : 'F'
    displayTemperature()
  })

  updateAppBasedOnIsGranted()
}

initializeApp()
