const express = require('express');
const router = express.Router();
const moment = require('moment');
const { channels } = require('../../config');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Profile chargé...");

router.get("/profile", (req, res) => {
    if(!req.isAuthenticated()) { return res.render('error.ejs', { req, code: '401' }) }

    res.render('profile/view.ejs', { req, createdAt: moment(req.user.createdAt).locale('fr').format('ll') })
})

router.get("/profile/delete", (req, res) => {
    if(!req.isAuthenticated()) { return res.redirect('/login') }

    res.render('profile/delete.ejs', { req })
})

router.post("/profile/delete", async (req, res) => {
    try {
        await global.db.query('DELETE FROM users WHERE id = ?', [req.user.id])
        
        res.clearCookie('connect.sid');
        res.clearCookie('session');
        res.clearCookie('session.sig');
        
        await global.client.channels.cache.get(channels.logs).send({embeds: [{
            color: global.client.color.messagecolor.red,
            title: `Suppression de compte`,
            description: `Nom : \`${req.user.prenom} ${req.user.nom}\`\nEmail : \`${req.user.email}\`\n
Pseudonyme : \`${req.user.username}\`
Status : \`${req.user.stm === null ? 'Extérieur à STM' : (req.user.stm === true ? 'Elève de STM' : 'Ancien élève de STM')}\`
\nDate de création : ${moment(req.user.createdAt).locale('fr').format('ll')}`,
        }]});
        
        return res.render('login/register.ejs', { req, message: ['success', "Utilisateur supprimé avec succès."] });
    } catch(e) { console.log(e) }
})

module.exports = router;