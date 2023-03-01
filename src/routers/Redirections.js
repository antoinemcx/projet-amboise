const express = require('express');
const router = express.Router();
console.log("\x1b[36m%s\x1b[0m", "(!) Router Redirections chargé...");

router.get("/discord", (req, res) => { res.redirect('https://discord.gg/JhRhU2cKVQ') })
router.get("/instagram", (req, res) => { res.redirect() }) // TODO
router.get("/paypal", (req, res) => { res.redirect() }) // TODO

module.exports = router;