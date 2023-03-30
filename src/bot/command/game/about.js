module.exports = {
    conf:{
        name: 'about',
        description: "Informations à propos du projet",
        usage: '<prefix>about',
        aliases: ['info'],
        dir: "game"
    },
    run: async (client, message, args) => {
        const msg = await message.reply(`Chargement...`);

        const accountCount = await client.db.query('SELECT COUNT(*) AS count FROM users;');
        const gameCount = await client.db.query('SELECT COUNT(*) AS count FROM users WHERE offer != 0;');
        const supposedMoney = parseInt(gameCount[0].count) * 7;

        const website_url = "https://amboise.antoinemcx.fr" //TODO
        const trailer_url = "https://youtu.be/dQw4w9WgXcQ" //TODO

        msg.delete();

        message.reply({embeds: [{
            color: client.color.messagecolor.embed,
            description: `**Affrontez vos amis dans l'enceinte de *Sainte-Marie* dans Projet Amboise !**\nCréé par des terminales, ce projet aidera au financement du bal des terminales.
\nSur Projet Amboise, vous jouerez dans une modélisation 3D de Sainte-Marie, notamment la cour de récréation, avec un pistolet laser.\n‎`,
            fields: [{
                name: 'Joueurs inscrits', value: accountCount[0].count.toString(), inline: true
            },
            {
                name: 'Exemplaires achetés', value: gameCount[0].count.toString(), inline: true
            },
            {
                name: 'Bénéfice estimé', value: `${supposedMoney}€`, inline: true
            },
            {
                name: 'Liens utiles',
                value: `[\`Site internet\`](${website_url})︲[\`Serveur Discord\`](${website_url}/discord)︲[\`Trailer du jeu\`](${trailer_url})︲[\`PayPal\`](${website_url}/paypal)`,
                inline: false
            }],
        }]})
    }
}