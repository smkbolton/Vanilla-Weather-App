//CURRENT DATE AND TIME
function formatDate(timestamp) {
  //calculates the date and returns it
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  //let currentDate = document.querySelector("#date");
  //currentDate.innerHTML =
  return `${day} ${hours}:${minutes}`;
}

//CITY AND WEATHER INNER HTML UPDATES FROM SEARCH
function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  tempFahrenheit = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//API WEATHER USING CITY INPUT
function citySearch(cityInput) {
  let units = "imperial";
  let apiKey = "2c3b195efbedc960ba063392d31bc9bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

//CITY INPUT
function clickSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-input").value;
  citySearch(cityInput);
}
let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", clickSubmit);

//TEMPERATURE CONVERSIONS
function changeToCelsius(event) {
  event.preventDefault();
  toCelsius.classList.add("active");
  toFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let tempCelsius = ((tempFahrenheit - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(tempCelsius);
}

function changeToFahrenheit(event) {
  event.preventDefault();
  toCelsius.classList.remove("active");
  toFahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(tempFahrenheit);
}

let tempFahrenheit = null;

let toCelsius = document.querySelector("#temp-celsius");
toCelsius.addEventListener("click", changeToCelsius);

let toFahrenheit = document.querySelector("#temp-fahrenheit");
toFahrenheit.addEventListener("click", changeToFahrenheit);
