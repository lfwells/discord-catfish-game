//discord
import { getClient, init_client, loginAllClients } from './core/client.js'; 
import init_guilds from "./guild/guild.js";

//optional: firebase database
//import { init_db } from './core/database.js';

//optional: express web server
//import { init_server } from "./core/server.js";
//init_server();

//login with discord auth token
//this is updated to have multiple clients
loginAllClients();

//optional: register for errors to be posted to test server
//import { initErrorHandler } from './core/errors.js';
//initErrorHandler(client);

