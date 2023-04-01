const express = require('express');
const router = express.Router();
const { discord } = require('../../config');
const path = require('path');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Main chargé...");

router.get("/", async (req, res) => {
    const accountCount = await global.db.query('SELECT COUNT(*) AS count FROM users;');
    const gameCount = await global.db.query('SELECT COUNT(*) AS count FROM users WHERE game != 0;');
    const memberCount = global.client && global.client.guilds.cache.get(discord.server_id).memberCount;
    const supposedMoney = parseInt(gameCount[0].count) * 7;
    
    res.render('index.ejs', { req, accountCount: accountCount[0].count, gameCount: gameCount[0].count, supposedMoney,  memberCount })
})

router.get("/about", (req, res) => {
    res.render('about.ejs', { req })
})

router.post('/windows-beta', (req, res) => {
    res.sendFile(path.resolve('src/download/windows-beta.zip'))
})

module.exports = router;