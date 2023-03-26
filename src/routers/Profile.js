const express = require('express');
const router = express.Router();
const moment = require('moment');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Profile chargé...");

router.get("/profile", (req, res) => {
    if(!req.isAuthenticated()) { return res.redirect('/login') }

    res.render('profile/view.ejs', { req, createdAt: moment(req.user.createdAt).locale('fr').format('ll') })
})

module.exports = router;