const mariadb = require('mariadb');
const { db } = require('../config');

const dbPool = mariadb.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    connectionLimit: 5
});

dbPool.getConnection().then(() => {
    console.log(' ')
    console.log("\x1b[33m%s\x1b[0m", `(!) Connexion à MariaDB avec succès`)
}).catch(err => {
    console.log(err)
});

module.exports = dbPool;