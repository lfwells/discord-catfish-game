# Discord Bot Template
Contains a Discord bot, as well as boilerplate for a persistent backend featuring
- Firebase database
- Express web server

This template isn't exactly plug-and-play, but I aim to update this in the future to reduce friction. 
Mainly, it needs a single config file. But for now, attempt to follow the instructions below:

## Initialization
Look for the //FLAGs in `core/client.js` and `guild/guild.js`, add initialization functions there

### Express Server
If using a server, look for the //FLAG in `core/routes.js`
And uncomment the relevant code in `discord.js`

### Firebase
If using Firebase database, modify `core/database.js`
And uncomment the relevant code in `discord.js`


## Usage

```
npm install pm2 -g
pm2 start ecosystem.config.cjs
pm2 monit
```
https://pm2.keymetrics.io/docs/usage/quick-start/#:~:text=Restart%20application%20on%20changes&text=This%20will%20watch%20%26%20restart%20the,check%20for%20restarted%20app%20logs.
