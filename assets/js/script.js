var searchBtn = $('.btn')
var citySearch = $('.city-search')
var cityForm = $('.city-form')
var cityName = $('.currentCityName')
var currentWeather = $('.current-weather')
var currentTempEl = $(".current-temp")
var currentWindEl = $(".current-wind")
var currentHumidityEl = $('.current-humidity')
var currentDayIcon = $('#icon')
var currentUvEl = $('.current-uv')
var uvBlock = $('#uv-index')
var secondColumn = $('.myDiv')
var cityGroup = $('.list-group')
var ul = $('ul')

var search;
var apiKey = "385e58697effddc1169cee4d7d6e5489"
var lat;
var lon;
var unixTime;
var savedCities = [];
var storedCity;
var cityBtn;
var card;

// Get the current time and add by day for the 5 day forecast
var currentTime = moment().format("l");
var d1 = moment().add(1, "days").format("l");
var d2 = moment().add(2, "days").format("l");
var d3 = moment().add(3, "days").format("l");
var d4 = moment().add(4, "days").format("l");
var d5 = moment().add(5, "days").format("l");

// If user reloads page, grap from local storage the cities they have searched and add it to the side bar list
function init() {
    storedCity = JSON.parse(localStorage.getItem("cities"))

    if (storedCity !== null) {
        savedCities = storedCity
        for (i = 0; i < savedCities.length; i++) {
            cityBtn = $("<button>")
            cityBtn.text(savedCities[i])
            cityBtn.addClass("btn btn-secondary w-100 mt-3 cityBtn")
            cityGroup.append(cityBtn)
        }
    }
}


// Fetch openweathermap api urls and render and display data
function getCoordinatesAndWeather(search) {

    // Get longitude and latitude for the city the user is trying to search for
    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=" + apiKey

    // fetch direct longitude and latitude for city
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        // Then get data to make another fetch call
        .then(function (data) {

            // Put the lat and lon data from previous api into this api parameters
            lat = data[0].lat.toString()
            lon = data[0].lon.toString()

            var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=385e58697effddc1169cee4d7d6e5489&units=imperial"

            // Fetch one call api data
            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
        
                    currentDayIcon.html("<img src='https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Icon depicting current weather.'>");

                    // Get the current weather information 
                    var temp = data.current.temp.toFixed()
                    var wind = data.current.wind_speed.toFixed()
                    var humidity = data.current.humidity
                    var uv = data.current.uvi
                    // Conditional statement for the uv index display the box in a different color
                    if (uv > 5) {
                        uvBlock.attr("style", "background-color: red;");
                    } else if (uv >= 3) {
                        uvBlock.attr("style", "background-color: #CDC836;");
                    } else {
                        uvBlock.attr("style", "background-color: green;");
                    }

                    // Display current weather information
                    cityName.text(search + " (" + currentTime + ")")
                    currentTempEl.text("Temp: " + temp + "°F");
                    currentWindEl.text("Wind: " + wind + " MPH");
                    currentHumidityEl.text("Humidity: " + humidity + "%");
                    currentUvEl.text("UV Index: ");
                    uvBlock.text(uv);

                    currentWeather.addClass('bg-primary bg-gradient')
                    currentWeather.attr('style', 'padding: 10px; color: white; margin-top: 15px; border-radius: 10px;')

                    cityName.append(currentDayIcon);
                    currentUvEl.append(uvBlock);
                    currentWeather.append(cityName);
                    currentWeather.append(currentTempEl);
                    currentWeather.append(currentWindEl);
                    currentWeather.append(currentHumidityEl);
                    currentWeather.append(currentUvEl);

                    // 5 Day forecast section
                    var fiveDayHeader = $('#five-day-header')
                    fiveDayHeader.text("Five Day Forecast")

                    var myCards = $('.myCards')
                    // Loop for the daily array on day 1 to day 5
                    for (i = 1; i < 6; i++) {
                        
                        // Create elements and attributes
                        var card = $('<div>')
                        card.addClass('card bg-success bg-gradient')
                        card.attr("style", "color: white; padding: 5px 15px;")
                        var dateHeader = $('<h4>')
                        var forecastWeatherIcon = $('<span>')
                        forecastWeatherIcon.html("<img src='https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png' alt='Icon depicting weather.'>");

                        var li1 = $('<p>').attr("style", "padding: 0; margin: 0;")
                        var li2 = $('<p>').attr("style", "padding: 0; margin: 2px;")
                        var li3 = $('<p>').attr("style", "padding: 0; margin: 2px;")
                        var li4 = $('<p>').attr("style", "padding: 0; margin: 2px;")

                        unixTime = data.daily[i].dt

                        // Display 5 day forecast information
                        dateHeader.text(dateFormatter(unixTime))

                        li1.append(forecastWeatherIcon)
                        li2.text("Temp: " + data.daily[i].temp.day.toFixed() + "°F")
                        li3.text("Wind: " + data.daily[i].wind_speed.toFixed() + " MPH")
                        li4.text("Humidity: " + data.daily[i].humidity + "%")

                        card.append(dateHeader, li1, li2, li3, li4);
                        myCards.append(card);
                        secondColumn.append(myCards)

                    }
                })

        })
}

// Turn unix time into a date string
function dateFormatter(unixTime) {
    var date = new Date(unixTime * 1000)
    var dateString = date.toLocaleDateString("en-US")
    return dateString;
}

// On click of the search button run the conditional statement and run the functions
searchBtn.on("click", function (event) {
    event.preventDefault();
    var cityValue = citySearch.val();
    if (cityValue) {
        removeCityWeather();
        getCoordinatesAndWeather(citySearch.val());
        setLocalStorage();
    } else {

    }

});

// Remove the 5 day forecast so that it won't keep displaying new cards
function removeCityWeather() {
    $(".card").remove();
}

// Set items in local storage if user hasn't already searched the same exact city
function setLocalStorage() {
    var storedCity = citySearch.val();
    if (storedCity !== null) {
        var duplicateCity = savedCities.includes(storedCity)
        if (duplicateCity) {
            return;
        } else {
            savedCities.push(storedCity)
            localStorage.setItem("cities", JSON.stringify(savedCities));
            cityBtn = $("<button>");
            cityBtn.addClass("btn btn-secondary w-100 mt-3 cityBtn");
            cityBtn.text(citySearch.val())
            cityGroup.append(cityBtn);
        }
    } else {
        return;
    }


}

// Get cities item from local storage
function getLocalStorage() {
    storedCity = localStorage.getItem("cities")
}

// When a user clicks on a local storage city button run these functions and display the openweathermap api data
cityGroup.click(function (e) {
    e.preventDefault();
    removeCityWeather();
    var cityClicked = $(e.target).text();
    getCoordinatesAndWeather(cityClicked);

});


init();




