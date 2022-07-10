function displayTemperature(response) {
  console.log(response.data.main.temp);
  let actualTemperatureElement = document.querySelector("#actualTemperature");
  actualTemperatureElement.innerHTML = Math.round(response.data.main.temp);
  let actualCityElement = document.querySelector("#actualCity");
  actualCityElement.innerHTML = response.data.name;
}

let apiKey = "1dad91bc92f6c69698e1aad50d0a7304";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
