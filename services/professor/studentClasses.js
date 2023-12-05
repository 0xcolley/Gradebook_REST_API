const express = require('express');
const { connection } = require('../../db.js'); 
const router = express.Router();

router.post('/studentClassesPost', (req, res) => {
    const studentId = req.body.studentId;

    if (!studentId) {
        return res.status(400).send('Student ID is required');
    }

    const query = `
        SELECT c.class_id, c.name
        FROM student_enrollment se
        JOIN classes c ON se.class_id = c.class_id
        WHERE se.student_id = ?
    `;

    connection.query(query, [studentId], (error, results) => {
        if (error) {
            console.error('Error fetching classes for student:', error);
            return res.status(500).send('Error fetching classes for student');
        }

        res.json(results);
    });
});

module.exports = router;
