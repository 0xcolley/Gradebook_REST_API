const express = require('express');
const { connection } = require('../../db.js');
const router = express.Router();

router.get('/studentsInFewClasses', (req, res) => {
    const classCountThreshold = parseInt(req.query.x, 10);

    if (isNaN(classCountThreshold)) {
        return res.status(400).send('Invalid number of classes provided');
    }

    const query = `
        SELECT se.student_id, COUNT(*) as class_count
        FROM student_enrollment se
        GROUP BY se.student_id
        HAVING COUNT(*) < ?
    `;

    connection.query(query, [classCountThreshold], (error, results) => {
        if (error) {
            console.error('Error fetching students:', error);
            return res.status(500).send('Error fetching students');
        }

        res.json(results);
    });
});

module.exports = router;
