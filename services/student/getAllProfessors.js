const express = require('express');
const { connection } = require('../../db.js'); 
const router = express.Router();

router.post('/getAllProfessors', (req, res) => {
    const query = `
        SELECT user_id, firstname, lastname, email_address
        FROM users
        WHERE user_type = 'PROFESSOR'
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching professors:', error);
            return res.status(500).send('Error fetching professors');
        }

        res.json(results);
    });
});

module.exports = router;
