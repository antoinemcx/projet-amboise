const express = require('express');
const router = express.Router();
console.log("\x1b[36m%s\x1b[0m", "(!) Router Main chargé...");

router.get("/", (req, res) => {
    res.render('index.ejs', { req })
})

module.exports = router;