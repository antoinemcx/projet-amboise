const { Client, Collection, GatewayIntentBits } = require("discord.js");
const client = (global.client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: false }
}));
const fs = require('fs');

client.config = require('./config.js');
client.commandes = new Collection();
client.aliases = new Collection();
cooldowns = new Collection();
client.color = require('./src/utils/color.js');
client.db = require('./src/database');

//LOADER ALL FILE AND COMMANDS
fs.readdir("./src/bot/command/", (err, files) => {
    if (err) console.log(err);
    files.forEach(dir => {
        fs.readdir('./src/bot/command/'+ dir +'/', (err, file) => {
            if (err) console.log(err);
            file.forEach(f => {
                const props = require(`./src/bot/command/${dir}/${f}`);
                client.commandes.set(props.conf.name, props);

                props.conf.aliases.forEach(alias => { client.aliases.set(alias, props.conf.name); });
            });
            console.log("\x1b[36m%s\x1b[0m", `(!) "${dir}" dossiers chargés`)
        })
    });
});

//LOADER ALL EVENT
fs.readdir("./src/bot/event/", (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        const event = require(`./src/bot/event/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
    console.log("\x1b[36m%s\x1b[0m", `(!) ${files.length} events chargés`)
});

client.login(client.config.token);
require('./src/server.js')(client);