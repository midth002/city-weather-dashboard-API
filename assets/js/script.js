var searchBtn = $('.btn')
var citySearch = $('.city-search')
var cityForm = $('.city-form')
var search;



function getWeatherAPI() {
    
var apiKey ="04365f2ca1de6e59e806c94b06579814"
var units = "imperial"
var cityQuery = search
var url  = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=" + apiKey + "&units=" + units
console.log(url)

fetch(url) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })

}



searchBtn.on("click", function(event) {
    event.preventDefault();
    search = citySearch.val();
    console.log(search);
    getWeatherAPI();
});

