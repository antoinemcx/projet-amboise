const { website, production } = require('../config');
global.db = require('./database');
const { sleep } = require('./utils/web_functions');

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const rateLimit = require('express-rate-limit');

module.exports = async () => {
    // CREATING WEB APP
    const app = express();
    const server = http.createServer(app);

    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
    app.use(express.static("src/public", { extensions:['pdf', 'jpg', 'png', 'mp4', 'gif', 'exe'] }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: website.secret,
        resave: false,
        saveUninitialized: false
    }))

    // RATE LIMITING
    const limiter = rateLimit({
        windowMs: 2 * 60 * 1000,
        max: 300,
        message: "429 : Too many requests, please try in 2 minutes."
    })

    // ROUTERS LOADING
    console.log("\n*"); console.log(" ")
        const mainRoute = require("./routers/Main");
        const redirectionRoute = require("./routers/Redirections");
        app.use('/', mainRoute)
        app.use('/', redirectionRoute)
    sleep(500);
    
    const listener = server.listen(website.port, '127.0.0.1', function() {
        console.log(' ');
        console.log("\x1b[32m%s\x1b[0m", `(!) App lancée sur le port ${listener.address().port}`)
        console.log(' ');
        sleep(500);
    })
}