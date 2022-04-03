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
var cardSection = $('.myCards')
var secondColumn = $('.myDiv')

var search;
var apiKey = "385e58697effddc1169cee4d7d6e5489"
var lat;
var lon;
var unixTime;



    var currentTime = moment().format("l");
    var d1 = moment().add(1, "days").format("l");
    var d2 = moment().add(2, "days").format("l");
    var d3 = moment().add(3, "days").format("l");
    var d4 = moment().add(4, "days").format("l");
    var d5 = moment().add(5, "days").format("l");

    var unixTime = 1648939303;
    var date = new Date(unixTime*1000)
    console.log(date.toLocaleDateString("en-US"))





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
        var temp = data.current.temp
        var wind = data.current.wind_speed
        var humidity = data.current.humidity
        var uv = data.current.uvi
        if (uv > 5) {
            uvBlock.attr("style", "background-color: red;");
        } else if (uv >= 3) {
            uvBlock.attr("style", "background-color: yellow;");
        } else {
            uvBlock.attr("style", "background-color: green;");
        }
        cityName.text(search + " (" + currentTime + ")")
        currentTempEl.text("Temp: " + temp);
        currentWindEl.text("Wind: " + wind + " MPH");
        currentHumidityEl.text("Humidity: " + humidity + "%");
        currentUvEl.text("UV Index: ");
        uvBlock.text(uv);
        
        
        

      

        for (i=1; i < 6; i++) {
            var card = $("<div>")
            card.addClass("card")
            unixTime = data.daily[i].dt;
            var date = new Date(unixTime*1000)
            var dateString = date.toLocaleDateString("en-US")
            var cardDate = $("<h4>")
            cardDate.text(dateString)
            
            var nextTemp = data.daily[i].temp.day
            var nextWind = data.daily[i].wind_speed
            var nextHumidity = data.daily[i].humidity
            var nextUl = $("<ul>");
            nextUl.attr("style", "list-style-type: none;")
            var li1 = $("<li>").addClass('li1').text("comingsoon");
            var li2 = $("<li>").addClass('li2').text("Temp: " + nextTemp);
            var li3 = $("<li>").addClass('li3').text("Wind: " + nextWind + " MPH");
            var li4 = $("<li>").addClass('li4').text("Humidity: " + nextHumidity + "%");

            nextUl.append(li1, li2, li3, li4);
         
          
            card.append(cardDate, nextUl);
            cardSection.append(card)
        
        }

        currentUvEl.append(uvBlock);

        currentWeather.append(cityName);
        currentWeather.append(currentTempEl);
        currentWeather.append(currentWindEl);
        currentWeather.append(currentHumidityEl);
        currentWeather.append(currentUvEl);

    })


    })

}





searchBtn.on("click", function(event) {
    event.preventDefault();
    getCoordinatesAndWeather();
   
});



