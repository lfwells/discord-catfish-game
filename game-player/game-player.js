import { getClient, getPlayerNumber } from "../core/client.js";
import { checkGuildHasAllPlayers, init_guild } from "../guild/guild.js";
import * as botTokens from '../bot_tokens.js';
import { sendGameStartMessage } from "../game-manager/game-manager.js";

export async function init_game_player( client)
{
    client.on("guildCreate", onJoin);
}

async function onJoin(guild)
{
    console.log("Player account ", getPlayerNumber(guild.client)," joined", guild.name);
    await init_guild(guild);

    if (await checkGuildHasAllPlayers(guild))
    {
        await sendGameStartMessage(guild);
    }
}

export async function sendGamePlayerMessage(msg, channel)
{
    await channel.send(msg)
}