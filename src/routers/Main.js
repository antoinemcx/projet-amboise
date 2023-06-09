const express = require('express');
const router = express.Router();
const { discord } = require('../../config');
const path = require('path');
const { checkMaintenance } = require('../utils/web_functions');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Main chargé...");

router.get("/", checkMaintenance, async (req, res) => {
    const accountCount = await global.db.query('SELECT COUNT(*) AS count FROM users;');
    const gameCount = await global.db.query('SELECT COUNT(*) AS count FROM users WHERE game != 0;');
    const memberCount = global.client && global.client.guilds.cache.get(discord.server_id).memberCount;
    const supposedMoney = ((parseInt(gameCount[0].count)-1) * 4.50) - 6;
    
    res.render('index.ejs', { req, accountCount: accountCount[0].count, gameCount: parseInt(gameCount[0].count), supposedMoney,  memberCount })
})

router.get("/about", checkMaintenance, (req, res) => { res.render('about.ejs', { req }) })
router.get("/tuto", checkMaintenance, (req, res) => { res.render('tuto.ejs', { req }) })

router.post('/ProjetAmboise_Windows', (req, res) => { res.sendFile(path.resolve(`src/download/ProjetAmboise_Windows.zip`)) })
router.post('/ProjetAmboise_MacOS', (req, res) => { res.sendFile(path.resolve(`src/download/ProjetAmboise_MacOS.zip`)) })

router.get("/legal", checkMaintenance, (req, res) => {
    res.render('legal.ejs', { req })
})

router.get('/robots.txt', (req, res) => { res.set('Content-Type', 'text/plain'); res.send(`Sitemap: https://projet-amboise.fr/sitemap.xml`); })
router.get('/sitemap.xml', (req, res) => {
    let link = "<url><loc>https://projet-amboise.fr/</loc></url>\n<url><loc>https://projet-amboise.fr/about</loc></url>";

    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1">${link}</urlset>`);
})

module.exports = router;