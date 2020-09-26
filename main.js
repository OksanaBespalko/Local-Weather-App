const API_KEY = "6b733a24b288986410b6d60eaf863578";
const KELVIN = 273;
let tempHTML = document.getElementById("temperature");
let locHTML = document.getElementById("location");
let descrHTML = document.getElementById("description");
let iconHTML = document.getElementById("iconHere");
let celsiusHTML = document.getElementById("celsius");
let fahrinheitHTML = document.getElementById("fahrinheit");
let unitHTML = document.getElementById("unit");

navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  console.log(lat, lon);
  getWeather(lat, lon);
});

const getWeather = (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let temperature = Math.floor(data.main.temp - KELVIN);
      tempHTML.innerHTML = temperature;
      let location = data.name;
      locHTML.innerHTML = data.name + "," + " " + data.sys.country;
      let description = data.weather[0].description;
      descrHTML.innerHTML = data.weather[0].description;
      let icon = data.weather[0].icon;
      let iconSource = `https://openweathermap.org/img/w/${icon}.png`;
      iconHTML.src = iconSource;
    });
};
const convertToFahrinheit = () => {
  let currentTemp = tempHTML.innerHTML;
  tempHTML.innerHTML = Math.floor(currentTemp * 9) / 5 + 32;
  let unit = "°F";
  unitHTML.innerHTML = unit;
  celsius.disabled = false;
  fahrinheit.disabled = true;
};
const convertToCelsius = () => {
  let currentTemp = tempHTML.innerHTML;
  tempHTML.innerHTML = Math.floor((currentTemp - 32) * 5) / 9;
  let unit = "°C";
  unitHTML.innerHTML = unit;
  celsius.disabled = true;
  fahrinheit.disabled = false;
};
