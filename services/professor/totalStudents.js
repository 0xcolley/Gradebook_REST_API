const express = require('express');
const { connection } = require('../../db.js');
const router = express.Router();

// GET route to get the total number of students
router.get('/totalStudents', (req, res) => {
    const query = 'SELECT COUNT(*) AS total FROM users WHERE user_type = "STUDENT"';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching total number of students:', error);
            return res.status(500).send('Error fetching total number of students');
        }

        res.json({ totalStudents: results[0].total });
    });
});

module.exports = router;