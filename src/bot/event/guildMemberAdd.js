const { channels } = require('../../../config').discord;

module.exports = async (client, member) => {
    const channel = client.channels.cache.get(channels.welcome);

    if(channel) { channel.send({ content: `**Bienvenue <@${member.user.id}> (\`${member.user.username}#${member.user.discriminator}\`) !**
Tu es sur le serveur discord de *Projet Amboise*, jeu aidant au financement d'une soirée.\n
Nous t'invitons à récupérer tes rôles dans <#1080534952959037450> et, pourquoi pas, à lire les <#1071830816470089821>.` }) }

    member.send({ content: `Bienvenue ${member.user.username} sur le serveur de *Projet Amboise*, pour avoir accès au serveur il faut que tu choisisses tes rôles dans <#1080534952959037450>` }).catch(() => {});
}