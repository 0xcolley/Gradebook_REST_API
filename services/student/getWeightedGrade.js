const express = require('express');
const { connection } = require('../../db.js');
const router = express.Router();

router.post('/getStudentGradeForClass', (req, res) => {
    const { studentId, classId } = req.body;

    if (!studentId || !classId) {
        return res.status(400).send('Student ID and Class ID are required');
    }

    const query = `
        SELECT g.grade, a.weight 
        FROM grades g
        JOIN assignments a ON g.assignment_id = a.assignment_id
        WHERE g.student_id = ? AND a.class_id = ?
    `;

    connection.query(query, [studentId, classId], (error, results) => {
        if (error) {
            console.error('Error fetching grades:', error);
            return res.status(500).send('Error fetching grades');
        }

        let totalWeight = 0;
        let weightedSum = 0;
        results.forEach(row => {
            weightedSum += row.grade * row.weight;
            totalWeight += row.weight;
        });

        const weightedAverage = totalWeight > 0 ? (weightedSum / totalWeight) : null;

        res.json({ studentId, classId, grade: weightedAverage });
    });
});

module.exports = router;
