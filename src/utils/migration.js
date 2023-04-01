const db = require('./database');

db.query(`CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` varchar(100) PRIMARY KEY NOT NULL,
    \`username\` varchar(50) NOT NULL,
    \`email\` varchar(100) NOT NULL,
    \`prenom\` varchar(100) NOT NULL,
    \`nom\` varchar(100) NOT NULL,
    \`password\` varchar(500) NOT NULL,
    \`createdAt\` date NOT NULL DEFAULT current_timestamp(),
    \`stm\` varchar(50) DEFAULT NULL,
    \`game\` varchar(50) DEFAULT NULL,
    \`rendering\` varchar(50) DEFAULT NULL,
    \`beta\` varchar(50) DEFAULT NULL,
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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