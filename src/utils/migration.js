const db = require('./database');

db.query(`CREATE TABLE IF NOT EXISTS <tableName> (
    //TODO: Quand la bdd est faite
`, (err) => {
    if (err) {
        console.log(err);
        return db.end();
    }

}).then(() => {
    console.log('(§) Tables créées');
    db.end();
    return process.exit();
})