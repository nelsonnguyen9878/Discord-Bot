# Discord-Bot

The point of this discord bot is to allow me to practice my javascript skills and build something that multiple discord server could use.
The bot interacts with external API's to fetch real time data
- openweathermap


Features ---------------
- /weather <city> # gives the weather of whatever city
- weather forecast that displays in a text channel for today and tomorrow's weather.
    - Displays every three hours to show the weather at the current time. 
- Welcome message for anyone that joins into the server



Updates/Changelog:
- Identified that render would keep shutting down the bot since there was no port for render to listen to. 
- Added a port to index.js that way render can perceive the bot as a web service and allow the bot to run 24/7
 

 Future plans/updates:
- Implementing a coin flip game (heads/tails)
    - Designing a leaderboard system
    - Adding a /profile to show balance, win, and losses
    - Implementing and linking the bot to a database to save users informations and data.
        - Possibly MongoDB atlas

- Figuring out a 24/7 host service
    - Possibly using a raspberry PI to host it locally 24/7
    - 

- Implementing grafana and prometheus to montior the bots analytics.
