// beginning of discord bot code
// Goal: Practicing 

// Libraries
// 
const { Client, GatewayIntentBits } = require("discord.js"); 
// require("discord.js") imports discord library and lets bot talkt to Discord
// Client represents the bot
// GatewayIntentBits listens to events
require("dotenv").config(); 
// "dotenv".config will load variables from .env file


//VARIABLES
const CHANNEL_ID = process.env.WEATHER_CHANNEL_ID // will fill with channel code
// go to developer mode in Discord, right-clic channel, copy channelID
const CITY = "Portland";
const apiKey = process.env.API_KEY;

module.exports = (client) => {
    setInterval(async () => {
        
        const channel = client.channels.cache.get(CHANNEL_ID);
        if(!channel) return; // returns if no channel is found

        try {
            // fetching current weather (sunrise/sunset, current temps)
            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}&units=imperial`
            );
            const weatherData = await weatherRes.json();

            // fetches current weather for today/tomorrow
            const forecastRes = await fetch(
                 `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${apiKey}&units=imperial`
            )
            const forecastData = await forecastRes.json();

            // weather information to print out
            if(weatherData.cod === 200 && forecastData.cod === "200") {
                const today = forecastData.list[0];
                const tomorrow = forecastData.list[8];


                // Current weather (from /weather API)
                const currentWeather = `🌍 Current Weather in ${weatherData.name}:
                Temp: ${weatherData.main.temp}°F (Feels like ${weatherData.feels_like}°F)
                Humidity: ${weatherData.main.humidity}%
                Wind: ${weatherData.wind.speed} mph
                Sunrise: <t:${weatherData.sys.sunrise}:t>
                Sunset: <t:${weatherData.sys.sunset}:t>
                Description: ${weatherData.weather[0].description}`;

                // information about today's weather
                const todayWeather = `
                Temp: ${today.main.temp}°F (Feels like ${today.feels_like}°F)
                Humidity: ${today.main.humidity}%
                Wind: ${today.wind.speed} mph
                Min temp: ${today.main.temp_min}°F
                Max temp: ${today.main.temp_max}°F
                Description: ${today.weather[0].description}`;

                // information abotu tomorrow's weather
                const tomorrowWeather = `Forecast Tomorrow:
                Temp: ${tomorrow.main.temp}°F 
                Humidity: ${tomorrow.main.humidity}%
                Wind: ${tomorrow.wind.speed} mph
                Min temp: ${tomorrow.main.temp_min}°F
                Max temp: ${tomorrow.main.temp_max}°F
                Description: ${tomorrow.weather[0].description}`;

                // sends message to discord channel
                channel.send(`${currentWeather}\n\n${todayWeather}\n\n${tomorrowWeather}`);
            } else {
                channel.send("❌ Could not fetch weather data."); // failing message
            }
        } catch (error) {
            console.error("Weather API error:", error);
        }
    },  3 * 60 * 60 * 1000); // sends update every three hours
};


