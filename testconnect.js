const mysql = require('mysql2');
const fs = require('fs');




const connection = mysql.createConnection(connectionConfig);

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error.stack);
        return;
    }
    console.log('Connected to the database successfully.');
    connection.end(); 
});

