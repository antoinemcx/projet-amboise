const express = require('express');
const router = express.Router();
const moment = require('moment');
const bcrypt = require('bcrypt');
const { channels } = require('../../config').discord;
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
        
        return res.render('profile/register.ejs', { req, message: ['success', "Utilisateur supprimé avec succès."] });
    } catch(e) { console.log(e) }
})

router.get("/profile/edit", (req, res) => {
    if(!req.isAuthenticated()) { return res.redirect('/login') }

    res.render('profile/edit.ejs', { req, message: null })
})

router.post("/profile/edit/info", async (req, res) => {
    const { pseudo, first_name, last_name, is_stm } = req.body;
    let stm = null;
    if(is_stm === 'true') { stm = true }

    try {
        if(req.user.username !== pseudo) {
            const search = await global.db.query('SELECT id FROM users WHERE username = ?', [pseudo]);
            if(search[0] !== undefined) { return res.render('profile/edit.ejs', { req, message: "Pseudonyme déjà utilisé." }) }
            if(pseudo.length < 3 || pseudo.length > 20) { return res.render('profile/edit.ejs', { req, message: "Le nom d'utilisateur doit être entre 2 et 32 caractères." }) }
        }
        
        global.db.query('UPDATE users SET username = ?, prenom = ?, nom = ?, stm = ? WHERE id = ?', [
            pseudo, first_name, last_name, stm, req.user.id
        ], (err, results) => {
            if(err) { return console.log(err) }
        });

        global.client.channels.cache.get(channels.logs).send({embeds: [{
            color: global.client.color.messagecolor.orange,
            title: `Modification de compte`,
            description: `Nom : \`${req.user.prenom} ${req.user.nom}\` -> \`${first_name} ${last_name}\`\nPseudonyme : \`${req.user.username}\` -> \`${pseudo}\`
Status : \`${req.user.stm === null ? 'Extérieur à STM' : 'Elève de STM'}\` -> \`${stm === null ? 'Extérieur à STM' : 'Elève de STM'}\``,
        }]});
        
        await res.clearCookie('connect.sid');
        await res.clearCookie('session');
        await res.clearCookie('session.sig');

        return res.render('profile/relogin.ejs', { req });
    } catch(e) {
        console.log(e)
        res.redirect('/login')
    }
})

router.post("/profile/edit/email", async (req, res) => {
    const { email, current_password } = req.body;

    try {
        if(!(await bcrypt.compare(current_password, req.user.password))) { return res.render('profile/edit.ejs', { req, message: "Mot de passe incorrect." }) }

        if(req.user.email !== email) {
            const search = await global.db.query('SELECT id FROM users WHERE email = ?', [email]);
            if(search[0] !== undefined) { return res.render('profile/edit.ejs', { req, message: "Email déjà utilisée." }) }
        }
        
        global.db.query('UPDATE users SET email = ? WHERE id = ?', [
            email, req.user.id
        ], (err, results) => {
            if(err) { return console.log(err) }
        });

        global.client.channels.cache.get(channels.logs).send({embeds: [{
            color: global.client.color.messagecolor.orange,
            title: `Modification de compte`,
            description: `Nom : \`${req.user.prenom} ${req.user.nom}\`\nEmail : \`${req.user.email}\` -> \`${email}\``,
        }]});
        
        await res.clearCookie('connect.sid');
        await res.clearCookie('session');
        await res.clearCookie('session.sig');

        return res.render('profile/relogin.ejs', { req });
    } catch(e) {
        console.log(e)
        res.redirect('/login')
    }
})

router.post("/profile/edit/password", async (req, res) => {
    const { current_password, password, password_confirm } = req.body;

    try {
        if(!(await bcrypt.compare(current_password, req.user.password))) { return res.render('profile/edit.ejs', { req, message: "Mot de passe incorrect." }) }
        if(password.length < 4 || password.length > 500) {
            return res.render('profile/edit.ejs', { req, message: "Le mot de passe doit être entre 4 and 500 caractères." })
        } else if(password !== password_confirm) { return res.render('profile/edit.ejs', { req, message: "Les mots de passes ne correspondent pas." }) }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        global.db.query('UPDATE users SET password = ? WHERE id = ?', [
            hashedPassword, req.user.id
        ], (err, results) => {
            if(err) { return console.log(err) }
        });
        
        await res.clearCookie('connect.sid');
        await res.clearCookie('session');
        await res.clearCookie('session.sig');

        return res.render('profile/relogin.ejs', { req });
    } catch(e) {
        console.log(e)
        res.redirect('/login')
    }
})

module.exports = router;