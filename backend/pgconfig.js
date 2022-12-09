const secrets = require('../secrets.json');

const knex = require('knex')({
    client: 'pg',
    connection: { database: 'e_shop', user: secrets.user, password: secrets.password }
  });


module.exports = knex;

