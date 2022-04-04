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


var currentTime = moment().format("l");
var d1 = moment().add(1, "days").format("l");
var d2 = moment().add(2, "days").format("l");
var d3 = moment().add(3, "days").format("l");
var d4 = moment().add(4, "days").format("l");
var d5 = moment().add(5, "days").format("l");

var unixTime = 1648939303;
var date = new Date(unixTime * 1000)


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

function getCoordinatesAndWeather(search) {

    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=" + apiKey

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            lat = data[0].lat.toString()
            lon = data[0].lon.toString()

            var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=385e58697effddc1169cee4d7d6e5489&units=imperial"

            fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)

                    currentDayIcon.html("<img src='https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png' alt='Icon depicting current weather.'>");

                    var temp = data.current.temp.toFixed()
                    var wind = data.current.wind_speed.toFixed()
                    var humidity = data.current.humidity
                    var uv = data.current.uvi
                    if (uv > 5) {
                        uvBlock.attr("style", "background-color: red;");
                    } else if (uv >= 3) {
                        uvBlock.attr("style", "background-color: #CDC836;");
                    } else {
                        uvBlock.attr("style", "background-color: green;");
                    }


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

                    var fiveDayHeader = $('#five-day-header')
                    fiveDayHeader.text("Five Day Forecast")

                    var myCards = $('.myCards')
                    for (i = 1; i < 6; i++) {
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


function dateFormatter(unixTime) {
    var date = new Date(unixTime * 1000)
    var dateString = date.toLocaleDateString("en-US")
    return dateString;
}

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

function removeCityWeather() {
    $(".card").remove();
}

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

function getLocalStorage() {
    storedCity = localStorage.getItem("cities")


}

cityGroup.click(function (e) {
    e.preventDefault();
    removeCityWeather();
    var cityClicked = $(e.target).text();
    getCoordinatesAndWeather(cityClicked);

});

init()




