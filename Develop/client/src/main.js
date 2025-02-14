import './styles/jass.css';
import require from 'require';
// * All necessary DOM elements selected
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const todayContainer = document.querySelector('#today');
const forecastContainer = document.querySelector('#forecast');
const searchHistoryContainer = document.getElementById('history');
const heading = document.getElementById('search-title');
const weatherIcon = document.getElementById('weather-img');
const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const humidityEl = document.getElementById('humidity');
const http = require("https");
const options = {
    "method": "GET",
    "hostname": "api.openweathermap.org/data/2.5/weather?id=524901&appid=80bdfc0c7bdae9434f8bc5ead971fb55",
    "port": null,
    "path": "/forecast5",
    "headers": {
        "cookie": "winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%25253D",
        "Server": "nginx/1.24.0",
        "Date": "Mon, 27 Jan 2025 03:44:47 GMT",
        "Content-Type": "text/html; charset=UTF-8",
        "Transfer-Encoding": "chunked",
        "Connection": "keep-alive",
        "Cache-Control": "private, must-revalidate",
        "pragma": "no-cache",
        "expires": "-1",
        "Set-Cookie": "winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%3D; expires=Mon, 27 Jan 2025 05:44:47 GMT; Max-Age=7200; path=/; httponly; samesite=lax",
        "Content-Length": "0"
    }
};
const req = http.request(options, function (res) {
    const chunks = [];
    res.on("data", function (chunk) {
        chunks.push(chunk);
    });
    res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
    });
});
req.end();
const fetchWeather = async (cityName) => {
    const response = await fetch('/api/weather/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityName }),
    });
    const weatherData = await response.json();
    console.log('weatherData: ', weatherData);
    renderCurrentWeather(weatherData[0]);
    renderForecast(weatherData.slice(1));
};
const fetchSearchHistory = async () => {
    const history = await fetch('/api/weather/history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return history;
};
const deleteCityFromHistory = async (id) => {
    await fetch(`/api/weather/history/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
/*

Render Functions

*/
const renderCurrentWeather = (currentWeather) => {
    const { city, date, icon, iconDescription, tempF, windSpeed, humidity } = currentWeather;
    // convert the following to typescript
    heading.textContent = `${city} (${date})`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
    weatherIcon.setAttribute('alt', iconDescription);
    weatherIcon.setAttribute('class', 'weather-img');
    heading.append(weatherIcon);
    tempEl.textContent = `Temp: ${tempF}°F`;
    windEl.textContent = `Wind: ${windSpeed} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    if (todayContainer) {
        todayContainer.innerHTML = '';
        todayContainer.append(heading, tempEl, windEl, humidityEl);
    }
};
const renderForecast = (forecast) => {
    const headingCol = document.createElement('div');
    const heading = document.createElement('h4');
    headingCol.setAttribute('class', 'col-12');
    heading.textContent = '5-Day Forecast:';
    headingCol.append(heading);
    if (forecastContainer) {
        forecastContainer.innerHTML = '';
        forecastContainer.append(headingCol);
    }
    for (let i = 0; i < forecast.length; i++) {
        renderForecastCard(forecast[i]);
    }
};
const renderForecastCard = (forecast) => {
    const { date, icon, iconDescription, tempF, windSpeed, humidity } = forecast;
    const { col, cardTitle, weatherIcon, tempEl, windEl, humidityEl } = createForecastCard();
    // Add content to elements
    cardTitle.textContent = date;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png`);
    weatherIcon.setAttribute('alt', iconDescription);
    tempEl.textContent = `Temp: ${tempF} °F`;
    windEl.textContent = `Wind: ${windSpeed} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    if (forecastContainer) {
        forecastContainer.append(col);
    }
};
const renderSearchHistory = async (searchHistory) => {
    const historyList = await searchHistory.json();
    if (searchHistoryContainer) {
        searchHistoryContainer.innerHTML = '';
        if (!historyList.length) {
            searchHistoryContainer.innerHTML =
                '<p class="text-center">No Previous Search History</p>';
        }
        // * Start at end of history array and count down to show the most recent cities at the top.
        for (let i = historyList.length - 1; i >= 0; i--) {
            const historyItem = buildHistoryListItem(historyList[i]);
            searchHistoryContainer.append(historyItem);
        }
    }
};
/*

Helper Functions

*/
const createForecastCard = () => {
    const col = document.createElement('div');
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const weatherIcon = document.createElement('img');
    const tempEl = document.createElement('p');
    const windEl = document.createElement('p');
    const humidityEl = document.createElement('p');
    col.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl);
    col.classList.add('col-auto');
    card.classList.add('forecast-card', 'card', 'text-white', 'bg-primary', 'h-100');
    cardBody.classList.add('card-body', 'p-2');
    cardTitle.classList.add('card-title');
    tempEl.classList.add('card-text');
    windEl.classList.add('card-text');
    humidityEl.classList.add('card-text');
    return {
        col,
        cardTitle,
        weatherIcon,
        tempEl,
        windEl,
        humidityEl,
    };
};
const createHistoryButton = (city) => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn', 'btn-secondary', 'col-10');
    btn.textContent = city;
    return btn;
};
const createDeleteButton = () => {
    const delBtnEl = document.createElement('button');
    delBtnEl.setAttribute('type', 'button');
    delBtnEl.classList.add('fas', 'fa-trash-alt', 'delete-city', 'btn', 'btn-danger', 'col-2');
    delBtnEl.addEventListener('click', handleDeleteHistoryClick);
    return delBtnEl;
};
const createHistoryDiv = () => {
    const div = document.createElement('div');
    div.classList.add('display-flex', 'gap-2', 'col-12', 'm-1');
    return div;
};
const buildHistoryListItem = (city) => {
    const newBtn = createHistoryButton(city.name);
    const deleteBtn = createDeleteButton();
    deleteBtn.dataset.city = JSON.stringify(city);
    const historyDiv = createHistoryDiv();
    historyDiv.append(newBtn, deleteBtn);
    return historyDiv;
};
/*

Event Handlers

*/
const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    if (!searchInput.value) {
        throw new Error('City cannot be blank');
    }
    const search = searchInput.value.trim();
    fetchWeather(search).then(() => {
        getAndRenderHistory();
    });
    searchInput.value = '';
};
const handleSearchHistoryClick = (event) => {
    if (event.target.matches('.history-btn')) {
        const city = event.target.textContent;
        fetchWeather(city).then(getAndRenderHistory);
    }
};
const handleDeleteHistoryClick = (event) => {
    event.stopPropagation();
    const cityID = JSON.parse(event.target.getAttribute('data-city')).id;
    deleteCityFromHistory(cityID).then(getAndRenderHistory);
};
/*

Initial Render

*/
const getAndRenderHistory = () => fetchSearchHistory().then(renderSearchHistory);
searchForm?.addEventListener('submit', handleSearchFormSubmit);
searchHistoryContainer?.addEventListener('click', handleSearchHistoryClick);
getAndRenderHistory();
