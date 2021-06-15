let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
let month = months[now.getMonth()];
let date = now.getDate();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}`;

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", searchCity);

function showTemperature(response) {
  let mainTemperature = document.querySelector("#main-temperature");
  let roundedTemperature = Math.round(response.data.main.temp);
  mainTemperature.innerHTML = `${roundedTemperature}º`;

  let feelsLikeTemp = document.querySelector("#feels-like");
  let roundedFeelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLikeTemp.innerHTML = `${roundedFeelsLikeTemp}`;

  let minimumTemp = document.querySelector("#min-day-temp");
  let roundedMinTemp = Math.round(response.data.main.temp_min);
  minimumTemp.innerHTML = `${roundedMinTemp}`;

  let maximumTemp = document.querySelector("#max-day-temp");
  let roundedMaxTemp = Math.round(response.data.main.temp_max);
  maximumTemp.innerHTML = `${roundedMaxTemp}`;

  let dayDescription = document.querySelector("#day-description");
  dayDescription.innerHTML = `Right now: ${response.data.weather[0].description}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let windSpeed = document.querySelector("#wind-speed");
  let roundedWindSpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${roundedWindSpeed}`;
}

function searchDefault(city) {
  let apiKey = "ff39a1560b2a6b58581393d9865ab25f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "ff39a1560b2a6b58581393d9865ab25f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCurrentLocation(position) {
  let apiKey = "ff39a1560b2a6b58581393d9865ab25f";
  let locateUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(locateUrl).then(showTemperature);
}

function locateCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let locateMeButton = document.querySelector("#locate-me");
locateMeButton.addEventListener("click", locateCurrentPosition);

searchDefault("Barcelona");
