const express = require('express');
const { connection } = require('../db.js'); 
const router = express.Router();


router.get('/listAllTables', (req, res) => {
    const query = `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'gradebook'
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching table list:', error);
            return res.status(500).send('Error fetching table list');
        }

        const tableNames = results.map(row => row.table_name);
        res.json(tableNames);
    });
});

module.exports = router;
