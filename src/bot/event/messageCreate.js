const { Collection } = require("discord.js");

module.exports = async (client, message) => {
    // BOT MENTION
    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){ return message.channel.send(`Besoin de mes commandes ? Utilises \`${client.config.prefix}help\``) }
    if(message.author.bot) { return }

    if(!message.content.startsWith(client.config.prefix)) { return }
    else {
        const command = message.content.split(' ')[0].slice(client.config.prefix.length).toLowerCase();
        const args = message.content.split(' ').slice(1);
        let cmd;
    
        if (client.commandes.has(command)){
            cmd = client.commandes.get(command)
        }else if(client.aliases.has(command)){
            cmd = client.commandes.get(client.aliases.get(command))
        }
        if(!cmd) return;
    
        const props = require(`../command/${cmd.conf.dir}/${cmd.conf.name}`);
    
        // COOLDOWNS & ERREUR
        if (!cooldowns.has(props.conf.name)) {
            cooldowns.set(props.conf.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(props.conf.name);
        const cooldownAmount = (props.conf.cooldown || 2) * 1000;
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Vous pourrez utiliser la commande \`${props.conf.name}\` dans **${timeLeft.toFixed(1)}** seconde(s)`);
        }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
        try {
            cmd.run(client, message, args);
        } catch (e) {
            client.emit("error", e, message);
        }
    }
};
