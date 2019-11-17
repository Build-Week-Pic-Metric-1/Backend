const knex = require('knex');
const options = require('../knexfile');

module.exports = knex(options.development);