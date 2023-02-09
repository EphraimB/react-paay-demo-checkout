const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ override: true });

const pool = new Pool({
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

module.exports = pool;