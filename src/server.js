const { website, production } = require('../config');
global.db = require('./utils/database');
const { sleep } = require('./utils/web_functions');

const http = require("http");
const passport = require('passport');
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const session = require("express-session");
const flash = require('express-flash');
const initializePassport = require('./utils/passport-config');

module.exports = async () => {
    // CREATING WEB APP
    const app = express();
    const server = http.createServer(app);

    app.set('view engine', 'ejs');
    app.set('views', 'src/views');
    app.use(express.static("src/public", { extensions:['pdf', 'jpg', 'png', 'mp4', 'gif', 'exe', 'zip'] }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(session({
        secret: website.secret,
        resave: false,
        saveUninitialized: false,
    }))
    app.use(flash());
    initializePassport(passport);
    app.use(passport.initialize());
    app.use(passport.session());

    // RATE LIMITING
    const limiter = rateLimit({
        windowMs: 2 * 60 * 1000,
        max: 300,
        message: "429 : Too many requests, please try in 2 minutes."
    })

    // ROUTERS LOADING
    console.log("\n*"); console.log(" ")
        const mainRoute = require("./routers/Main");
        const loginRoute = require("./routers/Login");
        const profileRoute = require("./routers/Profile");
        const redirectionRoute = require("./routers/Redirections");
        app.use('/', mainRoute)
        app.use('/', loginRoute)
        app.use('/', profileRoute)
        app.use('/', redirectionRoute)
        
        app.get("*", (req, res) => {
            res.status(404);
            res.render('error.ejs', { req, code: '404' })
        })
    sleep(500);
    
    const listener = server.listen(website.port, '127.0.0.1', function() {
        console.log(' ');
        console.log("\x1b[32m%s\x1b[0m", `(!) App lancée sur le port ${listener.address().port}`)
        console.log(' ');
        sleep(500);
    })
}
