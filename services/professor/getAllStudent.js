const express = require('express');
const { connection } = require('../../db.js');
const router = express.Router();


router.get('/getAllStudents', (req, res) => {
    const query = `
        SELECT DISTINCT s.student_id, u.firstname, u.lastname, u.email_address
        FROM students s
        JOIN users u ON s.student_id = u.user_id 
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching students:', error);
            return res.status(500).send('Error fetching students');
        }

        res.json(results);
    });
});

module.exports = router;
