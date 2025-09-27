# Discord-Bot

The point of this discord bot is to allow me to practice my javascript skills and build something that multiple discord server could use.
The bot interacts with external API's to fetch real time data
- openweathermap


Features ---------------
- /weather <city> # gives the weather of whatever city
- weather forecast that displays in a text channel for today and tomorrow's weather.
- Welcome message for anyone that joins into the server



Updates/Changelog:
- Identified that render would keep shutting down the bot since there was no port for render to listen to. 
- Added a port to index.js that way render can perceive the bot as a web service and allow the bot to run 24/7
 