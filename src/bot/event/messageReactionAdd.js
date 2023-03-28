module.exports = async (client, reaction, user) => {
    if(user === undefined) return;
    if(user.bot) return;
    if(reaction === undefined) return;
    
    let emote = reaction.emoji.id;
    if(emote === null) { emote = reaction.emoji.name }

    try {
        if(reaction.message.id !== '1080545611989921793') { return }
        const member = reaction.message.guild.members.cache.find(member => member.id === user.id)

        if(emote === '1080542768839020615') {
            member.roles.add('1080536418956357794') // STM
            member.roles.add('1071838345883299982') // MEMBRES
        } else if (emote === '🌐') {
            member.roles.add('1071838345883299982') // MEMBRES
        }

        else if (['6️⃣', '5️⃣', '4️⃣', '3️⃣', '2️⃣', '1️⃣', '🇹'].includes(emote)) {
            const roles = {
                '6️⃣': '1080536708556263506',
                '5️⃣': '1080536768740348005',
                '4️⃣': '1080536791439921243',
                '3️⃣': '1080536814613438474',
                '2️⃣': '1080536837505945612',
                '1️⃣': '1080536868082434148',
                '🇹': '1080536905734688902'
            }
            if(member.roles.cache.has(roles[emote])) { return }

            if(member.roles.cache.has(roles['6️⃣']) || member.roles.cache.has(roles['5️⃣']) || member.roles.cache.has(roles['4️⃣']) || member.roles.cache.has(roles['3️⃣']) ||
            member.roles.cache.has(roles['2️⃣']) || member.roles.cache.has(roles['1️⃣']) || member.roles.cache.has(roles['🇹'])) {
                reaction.users.remove(member.id)
                member.send(`Tu ne peux pas séléctionner deux classes à la fois.\nSi tu t'es trompé(e) de classe, il faut d'abord retirer l'autre rôle :wink:`).catch(() => {})
                return
            }

            member.roles.add(roles[emote]).catch(() => {})
        }
    } catch(e) { console.log(e) }
};
