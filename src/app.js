function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = data.getHours();
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
  console.log(response.data.main.temp);
  console.log(response.data);
  let actualTemperatureElement = document.querySelector("#actualTemperature");
  actualTemperatureElement.innerHTML = Math.round(response.data.main.temp);
  let actualCityElement = document.querySelector("#actualCity");
  actualCityElement.innerHTML = response.data.name;
  let currentWeatherElement = document.querySelector("#currentWeather");
  currentWeatherElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let currentDayTimeElement = document.querySelector("#currentDayTime");
  currentDayTimeElement.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = "1dad91bc92f6c69698e1aad50d0a7304";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
