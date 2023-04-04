module.exports = {
    token: '',
    prefix: 'a!',
    owners: [""], //Owner ID
    production: true/false,

    db: {
        host: 'localhost',
        user: '',
        password: "",
        database: '',
    },

    website: {
        port: 9000,
        secret: '',
    },
  
    discord: {
        server_id: "",
        channels: { //Channels IDs
            welcome: "",
            logs: ""
        }
    },

    sandbox_paypal: { //Business sandbox account
        client_id: "",
        client_secret: ""
    }
};