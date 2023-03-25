const express = require('express');
const router = express.Router();
const passport = require('passport');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Login chargé...");

router.get("/login", (req, res) => {
    if(req.isAuthenticated()) { return res.redirect('/') }

    res.render('login/login.ejs', { req, message: (req.session.flash && req.session.flash.error) })
});

router.post("/login", passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, }), (req, res) => {
    const backURL = req.header('Referer') || '/'; res.redirect(backURL);
});

router.get("/logout", (req, res) => {
    res.clearCookie('session');
    res.clearCookie('session.sig');

    res.redirect('/login');
});

module.exports = router;