const express = require('express');
const { connection } = require('../db.js'); 
const router = express.Router();


router.get('/listAllTables', (req, res) => {
    const query = `
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = 'gradebook';
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching table list:', error);
            return res.status(500).send('Error fetching table list');
        }

        
        res.json({result});
    });
});

module.exports = router;
