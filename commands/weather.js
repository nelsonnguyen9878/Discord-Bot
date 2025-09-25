const getWeather = require("../utils/getWeather");

module.exports = {
    name: "weather",
    description: "Get the current weather",
    options: [
        {
            name: "city",
            type: 3, // STRING
            description: "Enter a city (optional)",
            required: false,
        },
    ],
    
    // what happens when someone runs /weather
    async execute(interaction) {

        // Gets the city option defined by user or defaults to city in .env
        const city = interaction.options.getString("city") || process.env.CITY;
        
        try {
            // calls utility function
            const message = await getWeather(city);

            //reply to the user in discord
            await interaction.reply(message);
        } catch (error) {
            console.error(error);
            await interaction.reply("Could not fetch weather data.");
        }
    },
};
