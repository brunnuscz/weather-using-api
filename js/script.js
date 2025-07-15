// váriaveis e seleção de elementos
// adicione entre as aspas a sua chave
const apiKey = "938dc537e1ba367dd4a32c5ecf4c024f";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempMaxElement = document.querySelector("#temperature-max span");
const tempMinElement = document.querySelector("#temperature-min span");
const descElement = document.querySelector("#description");
const countryElement = document.querySelector("#country");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const msgError = document.querySelector("#msg-error");

// funções
const getWeatherData = async(city) => {
    const apiWeatherApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherApiURL);
    const data = await res.json();
    console.log(data);
    if(data.name != undefined){
        return data;
    }else{
        weatherContainer.classList.add("hide-1");
        msgError.classList.remove("hide-2");
    }
}
const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    cityElement.innerText = data.name;
    tempMaxElement.innerHTML = parseInt(data.main.temp_max);
    tempMinElement.innerHTML = parseInt(data.main.temp_min);
    descElement.innerText = data.weather[0].description;
    countryElement.innerText = data.sys.country;
    weatherIconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    
    weatherContainer.classList.remove("hide-1");
    msgError.classList.add("hide-2");
}

// eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
});


