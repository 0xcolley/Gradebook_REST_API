const mysql = require('mysql2');
const fs = require('fs');
const dotenv = require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.PORT_SERVER,
    ssl: { ca: fs.readFileSync('./ca-certificate.crt') }
});

module.exports = {connection};