require('dotenv').config();

module.exports = {
  logging: console.log,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  password: process.env.DB_PW,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
};