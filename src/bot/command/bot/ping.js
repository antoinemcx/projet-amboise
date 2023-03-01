module.exports = {
    conf:{
        name: 'ping',
        description: "Pong !",
        usage: '<prefix>ping',
        aliases: [],
        dir: "bot"
    },
    run: async (client, message, args) => {
        const msg = await message.reply(`...`)
        msg.delete()

        message.reply(`\\💓 Mon cœur bat à \`${msg.createdTimestamp - message.createdTimestamp}ms\` et l'API à \`${client.ws.ping} ms\``)
    }
}