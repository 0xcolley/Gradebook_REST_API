const mysql = require('mysql2');
const fs = require('fs');
const dotenv = require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT_SERVER,
    ssl: { ca: fs.readFileSync('./ca-certificate.crt') }
});

module.exports = {connection};