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

const CHANNEL_ID = "1419385686037106789" // will fill with channel code
// go to developer mode in Discord, right-clic channel, copy channelID

client.once("ready", () => {
    console.log('Logged in as ${client.user.tag}');

    // Senda  message every 60 seconds
    setInterval(() => {
        const channel = client.channels.cache.get(CHANNEL_ID);
        if (channel) {
            channel.send("You are gay !");
        }
    }, 0.1 * 1000); // 60 seconds
});

// bot logs in using the DISCORD TOKEN in the .env file
client.login(process.env.DISCORD_TOKEN);