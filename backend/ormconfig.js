const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  type: "postgres",
  host: process.env.db_host,
  port: process.env.db_port,
  username: process.env.db_user,
  password: process.env.db_password,
  database: "rating_8kmo",
  synchronize: true,
   ssl: {
    rejectUnauthorized: false, 
  },
  logging: false,
  entities: [
    "entities/*.js"
  ]
};