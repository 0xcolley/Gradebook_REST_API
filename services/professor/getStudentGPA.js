const express = require('express');
const { connection } = require('../../db.js'); 
const router = express.Router();

router.post('/getStudentGPA', (req, res) => {
    const { studentId } = req.body;

    if (!studentId) {
        return res.status(400).send('Student ID is required');
    }

    const query = 'SELECT GPA FROM transcripts WHERE student_id = ?';

    connection.query(query, [studentId], (error, results) => {
        if (error) {
            console.error('Error fetching GPA:', error);
            return res.status(500).send('Error fetching GPA');
        }

        if (results.length === 0) {
            return res.status(404).send('GPA data not found for the given student ID');
        }

        res.json({ studentId, GPA: results[0].GPA });
    });
});

module.exports = router;
