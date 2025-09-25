

async function getWeather(city = process.env.CITY) {
    const apiKey = process.env.API_KEY;

    const url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        
    const response = await fetch(url);
    const data = await response.json();

    if (data != 200) {
        throw new Error("Weather API Error");
    }

    return `🌤️ Weather in ${data.name}:
        Temp: ${data.main.temp}°F (Feels like ${data.main.feels_like}°F)
        Humidity: ${data.main.humidity}%
        Wind: ${data.wind.speed} mph
        Description: ${data.weather[0].description}`;
};

module.exports = getWeather;