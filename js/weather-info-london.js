
import { SetImage } from "./images.js";
import { DisplayIcon, DisplayLocationName, DisplayTemp, DisplayWeatherDesc, DisplayRain, DisplayLocalTime, DisplayFeel } from "./weather-info-handler.js";
import { fetchSecond } from "./weather-info-second.js";
import { changeIcon } from "./button-animation.js";

const firstLocWeather = 'London';
const secondLocWeather = 'Dover';
const thirdLocWeather = 'Las%20Vegas';
let latlong = "";
let chosenCity;
window.onload = function () {

  // chosenCity = prompt("Type 1 for London, Type 2 For Dover.")


  removeTextAnimation(document.getElementById("weather-location-name"));
  removeTextAnimation(document.getElementById("location-time"));
  removeTextAnimation(document.getElementById("temperature-feel"));
  removeTextAnimation(document.getElementById("rain"));
  removeTextAnimation(document.getElementById("weather-description"));
  removeTextAnimation(document.getElementById("temperature"));


  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${firstLocWeather}&appid=f145874df71d960cea49d51f34cba9da`)
    .then(response => response.json())
    .then(data => {





      const weatherID = data.weather[0].id;
      const weatherGeneral = data.weather[0].main;
      const weatherDecscription = data.weather[0].description;
      const weatherIcon = data.weather[0].icon;
      const weatherLocation = data.name;
      const localTimezone = data.timezone;
      let localRain = 0;
      //Check if there is Rain.


      if (weatherDecscription.includes("rain") || weatherDecscription.includes("Rain")) {

        const localRain = data.rain["1h"];
        DisplayRain(localRain);
      }

      const weatherTempCurrent = data.main.temp;
      const weatherTempMax = data.main.temp_max;
      const weatherTempMin = data.main.temp_min;
      const weatherTempFeel = data.main.feels_like;
      const sunriseTime = data.sys.sunrise * 1000;
      const sunsetTime = data.sys.sunset * 1000;


      const eIcon = "current-general-conditions-first";




      DisplayIcon(weatherID, weatherIcon, eIcon);
      DisplayLocationName(weatherLocation);
      DisplayTemp(weatherTempMin, weatherTempMax, weatherTempCurrent);
      DisplayWeatherDesc(weatherDecscription);
      DisplayLocalTime(localTimezone, sunriseTime, sunsetTime);
      DisplayFeel(weatherTempFeel)

      fetchSecond();


    })
    .catch(error => {
      console.error('Error retrieving data from API:', error);
    });
}


export function fetchFirstDetails() {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${firstLocWeather}&appid=f145874df71d960cea49d51f34cba9da`)
    .then(response => response.json())
    .then(data => {
      const weatherDecscription = data.weather[0].description;
      const weatherTempCurrent = data.main.temp;
      const weatherTempMax = data.main.temp_max;
      const weatherTempMin = data.main.temp_min;
      const weatherTempFeel = data.main.feels_like;
      const sunriseTime = data.sys.sunrise * 1000;
      const sunsetTime = data.sys.sunset * 1000;
      const weatherLocation = data.name;
      const localTimezone = data.timezone;



      DisplayLocationName(weatherLocation);
      DisplayTemp(weatherTempMin, weatherTempMax, weatherTempCurrent);
      DisplayWeatherDesc(weatherDecscription);
      DisplayLocalTime(localTimezone, sunriseTime, sunsetTime);
      DisplayFeel(weatherTempFeel);




    })
    .catch(error => {
      console.error('Error retrieving data from API:', error);
    });


}




function removeTextAnimation(element) {

  element.addEventListener('animationend', () => removeAnimation(element));




}

function removeAnimation(elem) {


  elem.classList.remove('fade-text');


}