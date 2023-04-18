const express = require('express');
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const { sandbox_paypal } = require('../../config');
const { checkMaintenance } = require('../utils/web_functions');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Payment chargé...");

paypal.configure({
    'mode': 'sandbox', // TODO -> live pour l'alpha
    'client_id': sandbox_paypal.client_id,
    'client_secret': sandbox_paypal.client_secret
})

router.get('/', checkMaintenance, (req, res) => {
    res.render('buy.ejs', { req })
})

router.post('/', (req, res) => {
    // TODO
})

module.exports = router;