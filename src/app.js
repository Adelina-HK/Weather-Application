function formatDate() {
  let date = new Date();
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-sm-2">
            <div class="forecastDay container-fluid">
              ${formatDay(forecastDay.dt)}
            </div>
            <div class="forecastImage">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" class="pics"/>
            </div>
            <div class="container forecastTemp">
              <span class="forecastTempMax"><strong>${Math.round(
                forecastDay.temp.max
              )}°</strong></span>
              <span class="forecastTempMin">${Math.round(
                forecastDay.temp.min
              )}°</span> 
            </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "1dad91bc92f6c69698e1aad50d0a7304";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let actualTemperatureElement = document.querySelector("#actualTemperature");
  actualTemperatureElement.innerHTML = Math.round(celsiusTemperature);
  let actualCityElement = document.querySelector("#actualCity");
  actualCityElement.innerHTML = response.data.name;
  let currentWeatherElement = document.querySelector("#currentWeather");
  currentWeatherElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/h`;
  let currentDayTimeElement = document.querySelector("#currentDayTime");
  currentDayTimeElement.innerHTML = formatDate();
  let mainPicElement = document.querySelector("#mainPic");
  mainPicElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainPicElement.setAttribute("alt", response.data.weather[0].main);
  getForecast(response.data.coord);
  celsiusLink.classList.add("activeLink");
  fahreinheitLink.classList.remove("activeLink");
}

function search(city) {
  let apiKey = "1dad91bc92f6c69698e1aad50d0a7304";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

let searchingFormElement = document.querySelector("#searchingForm");
searchingFormElement.addEventListener("submit", submitCity);

function displayFahreinheitTemperature(event) {
  event.preventDefault();
  let fahreinheitTemp = celsiusTemperature * 1.8 + 32;
  celsiusLink.classList.remove("activeLink");
  fahreinheitLink.classList.add("activeLink");
  let actualTemperatureElement = document.querySelector("#actualTemperature");
  actualTemperatureElement.innerHTML = Math.round(fahreinheitTemp);
}
let fahreinheitLink = document.querySelector("#fahreinheit-link");
fahreinheitLink.addEventListener("click", displayFahreinheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("activeLink");
  fahreinheitLink.classList.remove("activeLink");

  let actualTemperatureElement = document.querySelector("#actualTemperature");
  actualTemperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

search("Kyiv");
