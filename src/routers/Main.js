const express = require('express');
const router = express.Router();
console.log("\x1b[36m%s\x1b[0m", "(!) Router Main chargé...");

router.get("/", async (req, res) => {
    const accountCount = await global.db.query('SELECT COUNT(*) AS count FROM users;');
    const gameCount = await global.db.query('SELECT COUNT(*) AS count FROM users WHERE offer != 0;');
    const memberCount = global.client && global.client.guilds.cache.get('1071830816012906608').memberCount;
    const supposedMoney = parseInt(gameCount[0].count) * 7;
    
    res.render('index.ejs', { req, accountCount: accountCount[0].count, gameCount: gameCount[0].count, supposedMoney,  memberCount })
})

module.exports = router;