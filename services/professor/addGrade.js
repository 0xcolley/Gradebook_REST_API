const express = require('express');
const jwt = require('jsonwebtoken');
const { connection } = require('../../db.js');
const router = express.Router();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.professorId = user.user_id;
        next();
    });
};

router.post('/addGrade', authenticateToken, async (req, res) => {
    const { studentId, assignmentId, grade } = req.body;

    const validationQuery = `
        SELECT a.assignment_id 
        FROM assignments a
        JOIN classes c ON a.class_id = c.class_id
        WHERE a.assignment_id = ? AND c.professor_id = ?
    `;

    try {
        const validationResults = await new Promise((resolve, reject) => {
            connection.query(validationQuery, [assignmentId, req.professorId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (validationResults.length === 0) {
            return res.status(403).send('You are not authorized to grade this assignment');
        }

        const addGradeQuery = 'INSERT INTO grades (student_id, assignment_id, grade) VALUES (?, ?, ?)';
        connection.query(addGradeQuery, [studentId, assignmentId, grade], (error, results) => {
            if (error) {
                console.error('Error adding grade:', error);
                return res.status(500).send('Error adding grade');
            }

            res.status(201).send('Grade added successfully');
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;