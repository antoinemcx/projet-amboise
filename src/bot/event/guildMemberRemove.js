const { channels } = require('../../../config').discord;

module.exports = async (client, member) => {
    const channel = client.channels.cache.get(channels.welcome);

    if(channel) { channel.send({ content: `[-] \`${member.user.username}#${member.user.discriminator}\` nous a quittés, la honte...` }) }
}