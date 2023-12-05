const express = require('express');
const { connection } = require('../../db.js'); 
const router = express.Router();

router.get('/getGradeForAssignment', (req, res) => {
    const { studentId, assignmentId } = req.query;

    if (!studentId || !assignmentId) {
        return res.status(400).send('Student ID and Assignment ID are required');
    }

    const query = `
        SELECT grade
        FROM grades
        WHERE student_id = ? AND assignment_id = ?
    `;

    connection.query(query, [studentId, assignmentId], (error, results) => {
        if (error) {
            console.error('Error fetching grade:', error);
            return res.status(500).send('Error fetching grade');
        }

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Grade not found');
        }
    });
});

module.exports = router;