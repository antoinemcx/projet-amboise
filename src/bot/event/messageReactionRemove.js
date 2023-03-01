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
            member.roles.remove('1080536418956357794') // STM
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
            if(!member.roles.cache.has(roles[emote])) { return }

            member.roles.remove(roles[emote]).catch(() => {})
        }
    } catch(e) { console.log(e) }
};
