const { channels } = require('../../../config');

module.exports = async (client, member) => {
    const channel = client.channels.cache.get(channels.welcome);

    if(channel) { channel.send({ content: `[-] \`${member.user.username}#${member.user.discriminator}\` nous a quittés, la honte...` }) }
}