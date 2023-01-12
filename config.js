const env = process.env.NODE_ENV || 'development'
const secrets = require(`./.secrets.${env}`)
module.exports = {secrets}
