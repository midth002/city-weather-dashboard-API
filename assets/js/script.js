var searchBtn = $('.btn')
var citySearch = $('.city-search')
var cityForm = $('.city-form')
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
     console.log(data)
      var url  = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=385e58697effddc1169cee4d7d6e5489&units=imperial"

      fetch(url) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        
    })


    })

}


function renderWeatherAPI() {

}



searchBtn.on("click", function(event) {
    event.preventDefault();
    getCoordinatesAndWeather();
   
});



