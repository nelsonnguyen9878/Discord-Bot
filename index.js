require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, Collection} = require('discord.js');
const weatherCommand = require("./commands/weather");
const express = require("express");


// port
const app = express();
app.get("/", (req, res) => res.send("Bot is alive!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));

// creating new client instance
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// registering slash commands
const commands = [
    {
        name: weatherCommand.name, // '/weather'
        description: weatherCommand.description,
        options: weatherCommand.options // allows optional city
    },
];

// REST clients to talk to Discord's API
const rest = new REST({version: 10}).setToken(process.env.DISCORD_TOKEN);

// invoked async function to register commands
(async () => {
    try {
        console.log("Registering slash commands...");

        // register globably (takes ~1hr to appear)
        // For fast testing, use Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID).
        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("Slash command registerd");
    } catch (error) {
        console.error("Failed to register command", error);
    }
})();

// Listen for slash command interactions
client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return; // ignore other types of interaction

    if(interaction.commandName === "weather") {
        // pass interaction to weather command
        await weatherCommand.execute(interaction);
    }
});

// Load events
['ready', 'welcomeMember'].forEach(event => {
  require(`./events/${event}`)(client);
});

// Start weather task
require('./tasks/weather')(client);

// bot logs in using the DISCORD TOKEN in the .env file
client.login(process.env.DISCORD_TOKEN);