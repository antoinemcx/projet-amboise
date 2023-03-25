function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
};


async function getUserByEmailOrUsername(email) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await global.db.query(`SELECT * FROM users WHERE email = ? OR username = ?`, [email, email]);
            resolve(rows[0]);
        } catch (error) {
            reject(error);
        }
    });
};

async function getUserById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await global.db.query('SELECT * FROM users WHERE id = ?', [id]);
            resolve(rows[0]);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { sleep, getUserByEmailOrUsername, getUserById };