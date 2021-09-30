let weather = {
  apiKey: "13f3c9202798487d211c2ca0ad66d16d",
  fetchWeather: function (cityParam) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        cityParam +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((r) => {
        if (!r.ok) {
          alert("No weather data found for " + cityParam);
          throw new Error("No weather data found");
        }
        return r.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = description;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";

    document.querySelector(".weather").classList.remove("loading");

    document.body.style.backgroundImage =
      "url(https://source.unsplash.com/1600x900/?" + name + ")";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search-button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Calgary");
