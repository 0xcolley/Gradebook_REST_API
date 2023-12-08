const express = require('express');
const { connection } = require('../../db.js');
const router = express.Router();

// GET route to get the total number of professors
router.get('/totalProfessors', (req, res) => {
    const query = 'SELECT COUNT(professor_id) FROM professors;';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching total number of professors:', error);
            return res.status(500).send('Error fetching total number of professors');
        }

        res.json({ results });
    });
});

module.exports = router;