const express = require('express');
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const { sandbox_paypal, production, discord } = require('../../config');
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
    if(!req.isAuthenticated()) { return res.render('error.ejs', { req, code: '401' }) }
    if(req.user.game !== null) { return res.render('error.ejs', { req, code: '423' }) }
    
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
                    "price": "5.00",
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": "5.00"
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
    if(!req.isAuthenticated()) { return res.render('error.ejs', { req, code: '401' }) }
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "EUR",
                "total": "5.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
        if (error) {
            console.log(error.response);
            return res.render('error.ejs', { req, code: '404' })
        } else {
            const payment_id = payment.transactions[0].related_resources[0] ? payment.transactions[0].related_resources[0].sale.id : undefined;
            
            const tokens = await global.db.query(`SELECT * FROM tokens WHERE used IS NULL;`);
            await global.db.query(`UPDATE tokens SET used=1 WHERE token='${tokens[0].token}';`)
            
            await global.db.query(`UPDATE users SET game=true, token='${tokens[0].token}', transactionID='${payment_id}' WHERE id=${req.user.id};`);

            await global.client.channels.cache.get(discord.channels.logs).send({embeds: [{
                color: global.client.color.messagecolor.green,
                title: `Achat du jeu !`,
                description: `ID de la transaction : \`${payment_id}\`\n\nNom : \`${req.user.prenom} ${req.user.nom}\`\nEmail : \`${req.user.email}\`\n
Pseudonyme : \`${req.user.username}\`\nStatus : \`${req.user.stm === null ? 'Extérieur à STM' : (req.user.stm === true ? 'Elève de STM' : 'Ancien élève de STM')}\``,
            }]});
            res.send('S');
        }
    });
});

router.get('/cancel', (req, res) => { res.render('error.ejs', { req, code: '200' }) })

module.exports = router;