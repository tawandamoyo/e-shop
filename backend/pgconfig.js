const secrets = require('../secrets.json');

const { Client } = require('pg');
const client = new Client(secrets);

module.exports = client;

