// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: process.env.DEV_DB,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
    },
    migrations: {
      directory: './api/database/migrations'
    },
    seeds: {
      directory: './api/database/seeds'
    },
  },

  testing: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: process.env.DEV_TESTING_DB,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
    },
    migrations: {
      directory: './api/testing/database/migrations'
    },
    seeds: {
      directory: './api/testing/database/seeds'
    },
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: './api/database/migrations'
    },
    seeds:{
      directory: './database/seeds'
    },
  },

};
