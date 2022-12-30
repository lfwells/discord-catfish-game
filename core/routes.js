import { Router } from "express";

import { downloadResource, removeQuestionMark } from "./utils.js";

import * as guild from "../guild/guild.js";
import { filterButtons, loadClassList, loadClassListWithRemoved } from "../classList/classList.js";
import * as commands from "../guild/commands.js";

import * as login_routes from '../core/login.js';
import * as guild_routes from '../guild/routes.js';
import { renderEJS } from "./server.js";

//TODO: decided i hate this appraoch, we need an init_routes for each section instead
export default function(app)
{
    app.use(function(req, res, next){
        res.path = req.path;
        res.locals.path = req.path;
        next();
    });
    
    app.use(commands.loadCommands);

    app.use(defaultRouter());
    app.use("/guild/:guildID", guildRouter());
}

function defaultRouter() 
{
    var router = Router({ mergeParams: true });

    //home page (select guild)
    router.get("/", guild_routes.loadGuildList, guild_routes.guildList);
    router.get("/createFromTemplate", renderEJS("createFromTemplate"));
    router.get("/serverAdded", guild_routes.serverAddedRedirect);
    router.get("/serverAddedInGuide", guild_routes.serverAddedInGuideRedirect);

    router.get("/guide", guild_routes.loadGuildList, guide_routes.guide); 

    //login
    router.get("/login", login_routes.loginPage);
    router.get("/loginComplete", login_routes.loginComplete); 

    router.get("/logout", login_routes.logout);

    return router;
}

//this router should be in the guilds folder
function guildRouter() 
{
    var router = Router({ mergeParams: true });

    router.use(guild.load());

    //middleware check that this is one of "our" servers 
    router.use(guild.checkGuildAdmin);

    router.use(guild.loadGuildProperty("botName"));
    //FLAG: add cached guild properties here

    //guild home page (dashboard)
    router.get("/", guild_routes.guildHome);

    return router;
}

//this will just render out a page for us
function basic_render(page, data)
{
    return (req,res,next) =>
    {
        res.render(page, data);
    };
}