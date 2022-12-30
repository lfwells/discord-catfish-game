import { getPlayerNumber } from "../core/client.js";
import { init_guild } from "../guild/guild.js";
import * as botTokens from '../bot_tokens.js';

export async function init_game_player( client)
{
    client.on("guildCreate", onJoin);
}

async function onJoin(guild)
{
    console.log("Player account ", getPlayerNumber(guild.client)," joined", guild.name);
    await init_guild(guild);
}

export async function sendGamePlayerMessage(msg, channel)
{
    await channel.send(msg)
}