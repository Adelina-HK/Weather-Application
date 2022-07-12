function formatDate() {
  console.log();
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
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let currentDayTimeElement = document.querySelector("#currentDayTime");
  currentDayTimeElement.innerHTML = formatDate();
  let mainPicElement = document.querySelector("#mainPic");
  mainPicElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainPicElement.setAttribute("alt", response.data.weather[0].main);
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
  let fahreinheitTemp = (celsiusTemperature * 1.8 + 32);
celsiusLink.classList.remove("activeLink");
fahreinheitLink.classList.add("activeLink");
  let actualTemperatureElement = document.querySelector("#actualTemperature");
  actualTemperatureElement.innerHTML = Math.round(fahreinheitTemp);
}
let fahreinheitLink = document.querySelector("#fahreinheit-link");
fahreinheitLink.addEventListener("click", displayFahreinheitTemperature);

function displayCelsiusTemperature(event){
  event.preventDefault();
celsiusLink.classList.add("activeLink");
fahreinheitLink.classList.remove("activeLink");

  let actualTemperatureElement = document.querySelector("#actualTemperature");
actualTemperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


let celsiusTemperature=null;


search("Kyiv");