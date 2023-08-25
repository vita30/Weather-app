function formatDate(newDate) {
  let now = newDate;
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

  let hours = now.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let time = document.querySelector("#currentTime");
time.innerHTML = `${formatDate(new Date())}`;
console.log(formatDate(new Date()));

// Part 2
function showTemperature(response) {
  console.log(response.data);

  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = temperature;
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = wind;
  let weather = response.data.weather[0].main;
  let currentWeather = document.querySelector("#weather");
  currentWeather.innerHTML = weather;
  let currentCity = document.querySelector("h1");
  let city = response.data.name;
  currentCity.innerHTML = city;
}

function city(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  console.log(cityName.value);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName.value}`;
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let form = document.querySelector("#city");

form.addEventListener("submit", city);

//Part 3

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 55;
}

let fahrenheit = document.querySelector("#fahrenheit-link");

fahrenheit.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 18;
}

let celsius = document.querySelector("#celsius-link");

celsius.addEventListener("click", convertToCelsius);

let current = document.querySelector("#current");
current.addEventListener("click", currentLocationEvent);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function currentLocationEvent() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
