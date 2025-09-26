const fetch = require("node-fetch"); // if Node < 18

async function getWeather(city = process.env.CITY) {
    const apiKey = process.env.API_KEY;

    const url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        
    const response = await fetch(url);
    const data = await response.json();

    // debugging: API response
    //console.log("API response:", data);

    //!data.cod ensures the property exists
    //using parseInt(data.cod,10) handles both string and number form
    if (!data.cod || parseInt(data.cod, 10) !== 200) {
        throw new Error(data.message || "Weather API Error");
    }

    // weather message displayed in discord when using slash command
    return `🌤️ Weather in ${data.name}:
        Temp: ${data.main.temp}°F (Feels like ${data.main.feels_like}°F)
        Humidity: ${data.main.humidity}%
        Wind: ${data.wind.speed} mph
        Description: ${data.weather[0].description}`;
};

module.exports = getWeather;