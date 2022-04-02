var searchBtn = $('.btn')
var citySearch = $('.city-search')
var cityForm = $('.city-form')
var cityName = $('.currentCityName')
var currentWeather = $('.currentWeather')
var currentTempEl = $(".current-temp")
var currentWindEl = $(".current-wind")
var currentHumidityEl = $('.current-humidity')
var currentUvEl = $('.current-uv')
var uvBlock = $('#uv-index')
var search;
var apiKey = "385e58697effddc1169cee4d7d6e5489"
var lat;
var lon;


function getCoordinatesAndWeather() {
    search = citySearch.val();
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=" + apiKey

    fetch(url) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
    
      lat = data[0].lat.toString()
      lon = data[0].lon.toString()
     
      var url  = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=385e58697effddc1169cee4d7d6e5489&units=imperial"

      fetch(url) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        var temp = data.current.temp.toString()
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var uv = data.current.uvi
        cityName.text(search)
        currentTempEl.text("Temp: " + temp);
        currentWindEl.text("Wind: " + wind + " MPH");
        currentHumidityEl.text("Humidity: " + humidity + "%");
        currentUvEl.text("UV Index: ");
        uvBlock.text(uv);
        uvBlock.attr("style", "background-color: green; padding: 2px; color: white;");

        currentUvEl.append(uvBlock);

        currentWeather.append(cityName);
        currentWeather.append(currentTempEl);
        currentWeather.append(currentWindEl);
        currentWeather.append(currentHumidityEl);
        currentWeather.append(currentUvEl);

    })


    })

}


function renderWeatherAPI() {

}



searchBtn.on("click", function(event) {
    event.preventDefault();
    getCoordinatesAndWeather();
   
});



