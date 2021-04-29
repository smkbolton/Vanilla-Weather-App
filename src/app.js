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

//FORMATTING WEEKLY FORECAST DAYS
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

//POPULATE WEEKLY FORECAST DATA VIA API
function showForecast(response) {
  let forecastData = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="38"
        id="forecast-icon"
      />
      <div class="forecast-temperature">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}º</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}º</span>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//CALLING WEEKLY FORECAST API VIA SHOW WEATHER FUNCTION
function getForecast(coordinates) {
  let units = "imperial";
  let apiKey = "2c3b195efbedc960ba063392d31bc9bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
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

  getForecast(response.data.coord);
}

//API WEATHER USING CITY INPUT
function citySearch(cityInput) {
  let units = "imperial";
  let apiKey = "2c3b195efbedc960ba063392d31bc9bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

//COLLECTING CITY INPUT FROM EVENT LISTENER FUNCTION
function clickSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-input").value;
  citySearch(cityInput);
}
let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", clickSubmit);

//API WEATHER USING CURRENT LOCATION COORDINATES
function searchCoords(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let apiKey = "2c3b195efbedc960ba063392d31bc9bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

//CURRENT LOCATION IN COORDINATES FROM EVENT LISTENER
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCoords);
}

let currentCityBtn = document.querySelector("#current-location-btn");
currentCityBtn.addEventListener("click", getCurrentLocation);

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
