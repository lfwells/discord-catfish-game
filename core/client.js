import { Client, Intents } from 'discord.js';
import * as botTokens from '../bot_tokens.js';
import init_guilds, { checkGuildHasAllPlayers } from "../guild/guild.js";

function createClient(botInfo)
{
    let client = new Client({ 
        intents: [ 
            Intents.FLAGS.GUILDS, 
            //Intents.FLAGS.GUILD_INVITES, 
            Intents.FLAGS.GUILD_MEMBERS, 
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
            //Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGES, 
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
            Intents.FLAGS.DIRECT_MESSAGES,
        ],partials: ["CHANNEL"],
        fetchAllMembers: true,
    });
    client.botInfo = botInfo;

    client.on('ready', async () => 
    {
        //await init_db(); 

        console.log(`Logged in as ${client.user.tag}!`);

        //save all the guilds etc to db
        await init_guilds(client);
        await init_client(client);
    });

    return client;
} 

let client = null;
let playerClients = [];
export async function loginAllClients()
{
    client = createClient(botTokens.MAIN_TOKEN);
    playerClients = botTokens.TOKENS.map(createClient);
    await loginClient(getClient());
    for (var i = 0; i < playerClients.length; i++)
    {
        await loginClient(getPlayerClient(i));
    }

    while (client.isReady() == false || playerClients.every(c => c.isReady()) == false)
    {
        await new Promise(r => setTimeout(r, 500));
    }
    
    await new Promise(r => setTimeout(r, 1000));
    console.log('\u0007');
    console.log("---------\nREADY\n---------"); 

    checkGuildHasAllPlayers(await client.guilds.fetch("1058493982923051099"));
}
async function loginClient(client)
{
    console.log("Logging in to Discord...");  
    client.login(client.botInfo.secret).catch(reason => {

        console.log("Login failed: " + reason);
        console.log("Token used: " + client.botInfo.secret);

    }); 
} 


export function getClient() { return client };
export function getPlayerClient(playerID) { return playerClients[playerID]; }
export function getPlayerClients() { return playerClients; }
export function isMainClient(client)
{
    return client.application.id == getClient().application.id;
}
export function getPlayerNumber(client)
{
    return playerClients.findIndex(c => client.application.id == c.application?.id) + 1;
}

import { init_application_commands, init_interaction_cache } from '../guild/commands.js';
import { init_game_manager } from '../game-manager/game-manager.js';
import { init_game_player } from '../game-player/game-player.js';
//import { createOAuthLink } from './login.js';

export async function init_client(client)
{
    console.log("\tBegin init_client...", getPlayerNumber(client));
    client.removeAllListeners();

	//register the appropriate discord event listeners
    console.log("\tInit Interaction Cache...");   await init_interaction_cache(client);
    console.log("\tInit Application Commands...");await init_application_commands(client);
    
    //FLAG: init components here
    //console.log("\tInit X...");await init_X(client);
    if (isMainClient(client)) { console.log("\tInit Game Manager...");await init_game_manager(client); }
    else { console.log("\tInit Game Player...");await init_game_player(client); }
    console.log("\tEnd init_client. ", getPlayerNumber(client));

    //createOAuthLink();
}



export async function reply(originalMessage, message)
{
    var result = null;
    if (config.enableSendMessagesAndReplies)
    {
        result = await originalMessage.reply(message);
        console.log("REPLIED: "+message);
    } 
    else
    {
        console.log("(would have) REPLIED: "+message);
    }
    return result;
}
export async function send(channel, message, dontLogIt)
{
    if (channel && channel.send)
    {
        var result = null;
        if (config.enableSendMessagesAndReplies)
        {
            result = await channel.send(message);
            if (!dontLogIt) console.log("SENT: "+message);
        } 
        else
        {
            if (!dontLogIt) console.log("(would have) SENT: "+message);
        }
        return result;
    }
}