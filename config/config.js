const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'postgres',
    password: null,
    database: 'supercrimp_store',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: process.env.POSTGRES_PW,
    database: 'supercrimp_store',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
//
