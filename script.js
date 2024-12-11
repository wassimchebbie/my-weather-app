document.addEventListener("DOMContentLoaded", function () {
    const timeDisplay = document.getElementById("current-time");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    // Weather data API key and URL
    const apiKey = "b621e5d919fb0af2a42498ec0c65af4d"; // Replace with your actual API key
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    // Function to get weather data
    function getWeather(city) {
        const fullUrl = `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`;

        fetch(fullUrl)
            .then((response) => response.json())
            .then((weatherData) => {
                if (weatherData.cod === 200) {
                    showWeatherData(weatherData);
                } else {
                    alert("City not found!");
                }
            })
            .catch((error) => alert("Error fetching weather data."));
    }

    // Function to display weather data
    function showWeatherData(data) {
        document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = Math.round(data.main.temp);
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("humidity").textContent = `${data.main.humidity}%`;
        document.getElementById("wind-speed").textContent = `${Math.round(data.wind.speed)} km/h`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        document.querySelector(".weather-info img").src = iconUrl;
        
        document.getElementById("weather-info").classList.remove("hidden");
    }

    // Time function to show current time (AM/PM format)
    function updateTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const timeString = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${ampm}`;
        if (timeDisplay) { // Check if the timeDisplay element exists
            timeDisplay.textContent = timeString;
        }
    }

    // Update time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial call to set the time immediately

    // Event listener for search button
    searchButton.addEventListener("click", function () {
        const city = searchInput.value;
        if (city) {
            getWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });
});
