module.exports = async (client) => {
    console.log("\x1b[33m%s\x1b[0m", `(!) ${client.user.username} est en ligne...`)
    client.user.setPresence({ activities: [{ name: `${client.config.prefix}about • bot du serveur` }] })
};