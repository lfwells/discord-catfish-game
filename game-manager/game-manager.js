import { getClient, isMainClient } from "../core/client.js";
import { init_guild } from "../guild/guild.js";
import * as botTokens from '../bot_tokens.js';
import { MessageActionRow, MessageButton } from "discord.js";

export async function init_game_manager( client)
{
    client.on("guildCreate", onJoin);
}

async function onJoin(guild)
{
    console.log("Main account joined", guild.name);
    await init_guild(guild);

    //send an intro message!
    await sendGameManagerMessage({
        content: "Yay! Let's get started!\n\nTo play properly, you'll need to add the extra bots that make the game work:\n"+botTokens.TOKENS.map(botInfo => botInfo.oauth).join("\n"),
    }, guild.systemChannel);
}

//TODO: choose channel for our messages
export async function sendGameStartMessage(guild)
{
    guild = await getGuildAsMainBot(guild);

    let row = new MessageActionRow()
        .addComponents([
            new MessageButton({
                customId:"start_game",
                label: "Start Game",
                style: "PRIMARY"
            })
        ]);
    await sendGameManagerMessage({
        content: "Great, the gang's all here!\n\nYou can start a new game by pressing the button below.",
        components:[row]
    }, guild.systemChannel);
}

export async function sendGameManagerMessage(msg, channel)
{
    await channel.send(msg)
}

//otherwise, the guild object will be accessed as a player object
async function getGuildAsMainBot(guild)
{
    return await getClient().guilds.fetch(guild.id);
}

