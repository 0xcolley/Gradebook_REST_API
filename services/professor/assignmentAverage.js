const express = require('express');
const { connection } = require('../../db.js'); 
const router = express.Router();

// GET route to get the average grade for an assignment
router.get('/assignmentAverage/:assignmentId', (req, res) => {
    const { assignmentId } = req.params;

    const query = `
        SELECT AVG(grade) AS average_grade
        FROM grades
        WHERE assignment_id = ?
    `;

    connection.query(query, [assignmentId], (error, results) => {
        if (error) {
            console.error('Error fetching average grade:', error);
            return res.status(500).send('Error fetching average grade');
        }

        res.json({ averageGrade: results[0].average_grade });
    });
});

module.exports = router;
