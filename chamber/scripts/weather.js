const currentWeather =document.querySelector('#current-weather')
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const forecastCards = document.querySelector('#forecast-cards');
const captionDesc = document.querySelector('figcaption');
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=38.83&lon=-104.82&units=imperial&appid=be4d490bf4b091f55c180230c5c27fbe';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=38.83&lon=-104.82&units=imperial&appid=be4d490bf4b091f55c180230c5c27fbe';

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            //console.log(data); // testing only
            displayResults(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            //console.log(data); // testing only
            displayForecast(data); // uncomment when ready
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {

    currentTemp.innerHTML = `${data.main.temp}&deg;F`;


    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    let weatherFigure = document.createElement('figure');
    let weatherIcon = document.createElement('img');
    let captionDesc = document.createElement('p');

    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;

    weatherFigure.appendChild(weatherIcon);
    weatherFigure.appendChild(captionDesc);

    currentWeather.appendChild(weatherFigure);
}

function displayForecast(data) {
    // 1. Filter the 40 items down to just the midday items
    const middayForecasts = data.list.filter(item => item.dt_txt.includes('18:00:00'));
 
    const threeDay = middayForecasts.slice(0, 3);

    threeDay.forEach(day => {
        let dayCard = document.createElement('section');
        let forecastDate = document.createElement('h3');
        let dayTemp = document.createElement('p');
        let dayIcon = document.createElement('img');
        let dayDesc = document.createElement('p');

        let desc = day.weather[0].description;
        let iconsrc = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
        let date = new Date(day.dt_txt);
        let dayName = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});

        forecastDate.textContent = dayName;
        dayDesc.textContent = day.weather[0].description;
        dayTemp.innerHTML = `${day.main.temp}&deg;F`;
        dayIcon.setAttribute('src', iconsrc);
        dayIcon.setAttribute('alt', desc);
        

        dayCard.appendChild(forecastDate);
        dayCard.appendChild(dayTemp);
        dayCard.appendChild(dayIcon);
        dayCard.appendChild(dayDesc);


        forecastCards.appendChild(dayCard);

    })
}