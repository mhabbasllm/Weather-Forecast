document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherCard = document.getElementById('weather-card');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    // Weather data elements
    const locationElement = document.getElementById('location');
    const dateElement = document.getElementById('date');
    const weatherIcon = document.getElementById('weather-icon');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const feelsLikeElement = document.getElementById('feels-like');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const pressureElement = document.getElementById('pressure');

    // API key and base URL
    const apiKey = 'YourAPIKEY IS Here';
    const baseUrl = 'http://api.weatherapi.com/v1/current.json';

    // Theme toggle functionality
    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        // Save theme preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Format date
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Get weather icon based on condition code
    function getWeatherIcon(conditionCode, isDay) {
        const iconMap = {
            '1000': isDay ? 'fa-sun' : 'fa-moon',
            '1003': isDay ? 'fa-cloud-sun' : 'fa-cloud-moon',
            '1006': 'fa-cloud',
            '1009': 'fa-cloud',
            '1030': 'fa-smog',
            '1063': 'fa-cloud-rain',
            '1066': 'fa-snowflake',
            '1069': 'fa-cloud-meatball',
            '1072': 'fa-cloud-rain',
            '1087': 'fa-bolt',
            '1114': 'fa-wind',
            '1117': 'fa-snowflake',
            '1135': 'fa-smog',
            '1147': 'fa-smog',
            '1150': 'fa-cloud-rain',
            '1153': 'fa-cloud-rain',
            '1168': 'fa-cloud-rain',
            '1171': 'fa-cloud-rain',
            '1180': 'fa-cloud-rain',
            '1183': 'fa-cloud-rain',
            '1186': 'fa-cloud-rain',
            '1189': 'fa-cloud-rain',
            '1192': 'fa-cloud-rain',
            '1195': 'fa-cloud-rain',
            '1198': 'fa-cloud-rain',
            '1201': 'fa-cloud-rain',
            '1204': 'fa-cloud-meatball',
            '1207': 'fa-cloud-meatball',
            '1210': 'fa-snowflake',
            '1213': 'fa-snowflake',
            '1216': 'fa-snowflake',
            '1219': 'fa-snowflake',
            '1222': 'fa-snowflake',
            '1225': 'fa-snowflake',
            '1237': 'fa-cloud-meatball',
            '1240': 'fa-cloud-rain',
            '1243': 'fa-cloud-rain',
            '1246': 'fa-cloud-rain',
            '1249': 'fa-cloud-meatball',
            '1252': 'fa-cloud-meatball',
            '1255': 'fa-snowflake',
            '1258': 'fa-snowflake',
            '1261': 'fa-cloud-meatball',
            '1264': 'fa-cloud-meatball',
            '1273': 'fa-cloud-rain',
            '1276': 'fa-cloud-rain',
            '1279': 'fa-snowflake',
            '1282': 'fa-snowflake'
        };

        return iconMap[conditionCode] || 'fa-cloud';
    }

    // Fetch weather data
    async function fetchWeatherData(location) {
        try {
            // Show loading indicator
            loading.style.display = 'block';
            weatherCard.style.display = 'none';
            errorMessage.style.display = 'none';

            const response = await fetch(`${baseUrl}?key=${apiKey}&q=${location}&aqi=yes`);

            if (!response.ok) {
                throw new Error('Weather data not found');
            }

            const data = await response.json();

            // Update UI with weather data
            locationElement.textContent = `${data.location.name}, ${data.location.country}`;
            dateElement.textContent = formatDate(data.location.localtime);
            temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
            descriptionElement.textContent = data.current.condition.text;
            feelsLikeElement.textContent = `${Math.round(data.current.feelslike_c)}°C`;
            humidityElement.textContent = `${data.current.humidity}%`;
            windSpeedElement.textContent = `${data.current.wind_kph} km/h`;
            pressureElement.textContent = `${data.current.pressure_mb} hPa`;

            // Update weather icon
            const iconClass = getWeatherIcon(data.current.condition.code, data.current.is_day);
            weatherIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;

            // Hide loading and show weather card
            loading.style.display = 'none';
            weatherCard.style.display = 'block';

        } catch (error) {
            // Show error message
            loading.style.display = 'none';
            errorMessage.textContent = `Error: ${error.message}. Please try again.`;
            errorMessage.style.display = 'block';
            weatherCard.style.display = 'none';
        }
    }

    // Event listeners
    searchBtn.addEventListener('click', function () {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherData(location);
        }
    });

    locationInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const location = locationInput.value.trim();
            if (location) {
                fetchWeatherData(location);
            }
        }
    });

    // Initialize with default location
    fetchWeatherData('London');
});


