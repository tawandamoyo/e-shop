const { Client } = require('pg');

const pgConfigObj = {
  user: 'postgres',
  host: 'localhost',
  database: 'pizzaorders',
  password: 'tawanda'
};

const client = new Client(pgConfigObj);

module.exports = client;






// ALTER USER postgres WITH PASSWORD 'NEWPASS';
// alter role postgres password null;
