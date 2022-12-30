import { getClient, isMainClient } from "../core/client.js";
import { init_guild } from "../guild/guild.js";
import * as botTokens from '../bot_tokens.js';

export async function init_game_manager( client)
{
    client.on("guildCreate", onJoin);
}

async function onJoin(guild)
{
    console.log("Main account joined", guild.name);
    await init_guild(guild);

    //send an intro message!
    let channel = guild.systemChannel;
    await channel.send({
        content: "Yay! Let's get started!\n\nTo play properly, you'll need to add the extra bots that make the game work:\n"+botTokens.TOKENS.map(botInfo => botInfo.oauth).join("\n"),
    })
}