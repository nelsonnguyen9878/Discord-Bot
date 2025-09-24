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

// Creating the bot client
// new Client({...}) ->  creates a new bot instance
// intents: [...] -> tells the bot what to listen for
    // .Guilds -> lets the bot connect to server
    // .GuildMessage -> lets the bot read/send messages

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

//VARIABLES
const CHANNEL_ID = "1419385686037106789" // will fill with channel code
// go to developer mode in Discord, right-clic channel, copy channelID
const CITY = "Portland";
const apiKey = process.env.API_KEY;

client.once("ready", () => {
    console.log('Logged in as ${client.user.tag}');
    setInterval(async () => {
        
        const channel = client.channels.cache.get(CHANNEL_ID);
        if(!channel) return; // returns if no channel is found

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${apiKey}&units=imperial`
            );
            const data = await response.json();

            if(data.cod === 200) {
                const weatherMessage = `🌤️ Weather in ${data.name}: ${data.main.temp}°F, ${data.weather[0].description}`;
                channel.send(weatherMessage);
            } else {
                channel.send("❌ Could not fetch weather data.");
            }
        } catch (error) {
            console.error("Weather API error:", error);
        }
    }, 60 * 60 * 1000); // 60 seconds
});

// bot logs in using the DISCORD TOKEN in the .env file
client.login(process.env.DISCORD_TOKEN);