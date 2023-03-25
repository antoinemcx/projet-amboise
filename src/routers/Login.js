const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcrypt');
const { channels } = require('../../config');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Login chargé...");

router.get("/login", (req, res) => {
    if(req.isAuthenticated()) { return res.redirect('/') }

    res.render('login/login.ejs', { req, message: (req.session.flash && req.session.flash.error) })
});

router.post("/login", passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, }), (req, res) => {
    const backURL = req.header('Referer') || '/'; res.redirect(backURL);
});

router.get("/register", (req, res) => {
    if(req.isAuthenticated()) { return res.redirect('/') }

    res.render('login/register.ejs', { req, message: (req.session.flash && req.session.flash.error) })
});

router.post("/register", async (req, res) => {
    const { email, pseudo, first_name, last_name, is_stm, password, password_confirm } = req.body;
    let stm = null;
    if(is_stm === 'true') { stm = true }
    else if(is_stm === 'old') { stm = false }

    try {
        const search = await global.db.query('SELECT id,username,email FROM users WHERE email = ? or username = ?', [email, pseudo]);

        if(search[0] !== undefined) { return res.render('login/register.ejs', { req, message: ['error', "Email ou nom d'utilisateur déjà utilisé."] })
        } else if(pseudo.length < 3 || pseudo.length > 20) { return res.render('login/register.ejs', { req, message: ['error', "Le nom d'utilisateur doit être entre 2 et 32 caractères."] })
        } else if(password.length < 4 || password.length > 500) { return res.render('login/register.ejs', { req, message: ['error', "Le mot de passe doit être entre 4 and 500 caractères."] })
        } else if(password !== password_confirm) { return res.render('login/register.ejs', { req, message: ['error', "Les mots de passes ne correspondent pas."] }) }

        const hashedPassword = await bcrypt.hash(password, 10)
        function generateID(length) {
            const values = '0123456789';
            let id = '';
            for (let _length = 0; _length < length; _length++) id += values[Math.floor(Math.random() * values.length)];

            global.db.query(`SELECT * FROM users WHERE id = "${id}"`).then(rows => { if(rows[0] !== undefined) { generateID(15) } })
            return id;
        };

        global.db.query('INSERT INTO users (id,username,email,prenom,nom,password,stm) VALUES (?,?,?,?,?,?,?)', [
            generateID(15), pseudo, email, first_name, last_name, hashedPassword, stm
        ], (err, results) => {
            if(err) { return console.log(err) }
        });

        global.client.channels.cache.get(channels.logs).send({embeds: [{
            color: global.client.color.messagecolor.embed,
            title: `Nouvelle inscription sur le site`,
            description: `Nom : \`${first_name} ${last_name}\`\nEmail : \`${email}\`\n
Pseudonyme : \`${pseudo}\`\nStatus : \`${stm === null ? 'Extérieur à STM' : (stm === true ? 'Elève de STM' : 'Ancien élève de STM')}\`
\nDate de création : <t:${Math.round(Date.now()/1000)}:R>`,
        }]});
        return res.render('login/register.ejs', { req, message: ['success', "Utilisateur enregistré avec succès."] });
    } catch(e) {
        console.log(e)
        res.redirect('/register')
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie('connect.sid');
    res.clearCookie('session');
    res.clearCookie('session.sig');

    res.redirect('/login');
});

module.exports = router;