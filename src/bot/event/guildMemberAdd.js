const { channels } = require('../../../config');

module.exports = async (client, member) => {
    const channel = client.channels.cache.get(channels.welcome);

    if(channel) { channel.send({ content: `**Bienvenue <@${member.user.id}> (\`${member.user.username}#${member.user.discriminator}\`) !**
Tu es sur le serveur discord de *Projet Amboise*, jeu aidant au financement du bal des terminales.\n
Nous t'invitons à récupérer tes rôles dans <#1080534952959037450> et, pourquoi pas, à lire les <#1071830816470089821>.` }) }
}