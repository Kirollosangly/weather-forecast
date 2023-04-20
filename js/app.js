function justLoaded() {
    window.addEventListener('load', () => {
        getForecast('egypt')
    })
};
justLoaded();

let navI = Array.from(document.querySelectorAll('.nav-item'));
let navL = Array.from(document.querySelectorAll('.nav-link'));

for (let i = 0; i < navI.length; i++) {
    navI[i].addEventListener('click', () => {
        navI.forEach(function(removeIActive){
            removeIActive.classList.remove('active-item');
        });
        navL.forEach(function(removeLAtice){
            removeLAtice.classList.remove('active-link')
        });
        navI[i].classList.add('active-item');
        navL[i].classList.add('active-link');
    });
};

function displayDate() {
    let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday', 'Monday'];
    const cDate = new Date();
    const dayNum = cDate.getDay();
    const cDay = cDate.getDate();
    let month = cDate.toLocaleString('default', { month: 'long' });

    let today = (`${cDay} ${month}`);
    let nextDay = (`${cDay + 1} ${month}`);
    let nextNextday = (`${cDay + 2} ${month}`);

    let headerData = document.querySelectorAll('.header');
    for (let i = 0; i < headerData.length; i++) {
        if (i === 0) {headerData[i].innerHTML = `${week[dayNum]}, ${today}`;} 
        else if (i === 1) {headerData[i].innerHTML = `${week[dayNum + 1]}, ${nextDay}`;} 
        else if (i === 2) {headerData[i].innerHTML = `${week[dayNum + 2]}, ${nextNextday}`;}
    };
};

let weatherData = [];
let searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    weatherData = [];
    let search = document.getElementById('search');
    getForecast(search.value)
});

async function getForecast(location) {
    let currentDay = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=601b5c1f10ea41aa96c125556232202&q=${location}&days=2&aqi=no&alerts=no`)
    let currentDayData = await currentDay.json();
    weatherData.push(currentDayData);
    displayForecastData();
};

function displayForecastData() {
    displayDate()
    let cityName = document.getElementById('cityName');
    cityName.innerText = `${weatherData[0].location.name}, ${weatherData[0].location.country}`;

    let degreeJS = document.getElementById('degreeJS');
    degreeJS.innerText = `${weatherData[0].current.temp_c}°C`;

    let skyConiditon = document.getElementById('skyConiditon');
    skyConiditon.innerText = `${weatherData[0].current.condition.text}`;

    let cloudCon = document.getElementById('cloudCon');
    cloudCon.setAttribute('src', `${weatherData[0].current.condition.icon}`)

    let humidity = document.getElementById('humidity');
    let droplet = document.getElementById('droplet');
    humidity.innerText = `${weatherData[0].current.humidity}%`;
    droplet.setAttribute('class', 'fa-solid fa-droplet fw-semibold');

    let windSpeed = document.getElementById('windSpeed');
    let wind = document.getElementById('wind');
    windSpeed.innerText = `${weatherData[0].current.wind_kph}km/h`;
    wind.setAttribute('class', 'fa-solid fa-wind fw-semibold');

    let windDir = document.getElementById('windDir');
    let compass = document.getElementById('compass');
    windDir.innerText = `${weatherData[0].current.wind_dir}`;
    compass.setAttribute('class', 'fa-solid fa-compass  fw-semibold')
    /* *** */
    let nextcloudCon = document.getElementById('nextcloudCon');
    nextcloudCon.setAttribute('src', `${weatherData[0].forecast.forecastday[0].day.condition.icon}`)

    let nextdegreeJS = document.getElementById('nextdegreeJS');
    let nextMinJS = document.getElementById('nextMinJS');
    nextdegreeJS.innerText = `${weatherData[0].forecast.forecastday[0].day.maxtemp_c}°C`;
    nextMinJS.innerText = `${weatherData[0].forecast.forecastday[0].day.mintemp_c}°C`;

    let nextSkyConiditon = document.getElementById('nextSkyConiditon');
    nextSkyConiditon.innerText = `${weatherData[0].forecast.forecastday[0].day.condition.text}`;
    /* *** */
    let next1cloudCon = document.getElementById('next1cloudCon');
    next1cloudCon.setAttribute('src', `${weatherData[0].forecast.forecastday[0].day.condition.icon}`)

    let next1degreeJS = document.getElementById('next1degreeJS');
    let next1MinJS = document.getElementById('next1MinJS');
    next1degreeJS.innerText = `${weatherData[0].forecast.forecastday[1].day.maxtemp_c}°C`;
    next1MinJS.innerText = `${weatherData[0].forecast.forecastday[1].day.mintemp_c}°C`;

    let next1SkyConiditon = document.getElementById('next1SkyConiditon');
    next1SkyConiditon.innerText = `${weatherData[0].forecast.forecastday[1].day.condition.text}`;
};









