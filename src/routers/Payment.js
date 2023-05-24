const express = require('express');
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const { sandbox_paypal, production } = require('../../config');
const { checkMaintenance } = require('../utils/web_functions');
console.log("\x1b[36m%s\x1b[0m", "(!) Router Payment chargé...");

var website_url = 'https://projet-amboise.fr'
if(production === false) { website_url = 'http://localhost:5000' }

paypal.configure({
    'mode': 'sandbox', // TODO -> live pour l'alpha
    'client_id': sandbox_paypal.client_id,
    'client_secret': sandbox_paypal.client_secret
})

router.get('/', checkMaintenance, (req, res) => {
    res.render('buy.ejs', { req })
})

router.post('/', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": `${website_url}/buy/success`,
            "cancel_url": `${website_url}/buy/cancel`
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Jeu",
                    "sku": "001",
                    "price": "4.00",
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": "4.00"
            },
            "description": "Acheter le jeu vidéo Projet Amboise."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            return res.render('error.ejs', { req, code: '404' })
        } else {
            for(let i = 0; i < payment.links.length ; i++) {
                if(payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
});

router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "EUR",
                "total": "4.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            return res.render('error.ejs', { req, code: '404' })
        } else {
            console.log(JSON.stringify(payment));
            res.send('S');
        }
    });
});

router.get('/cancel', (req, res) => { res.render('error.ejs', { req, code: '200' }) })

module.exports = router;