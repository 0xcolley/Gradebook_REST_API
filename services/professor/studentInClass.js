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
        req.user = user;
        next();
    });
};

router.post('/studentInClass', authenticateToken, (req, res) => {
    const { classId } = req.body;

    const query = `
        SELECT u.user_id, u.firstname, u.lastname, u.email_address 
        FROM student_enrollment se
        JOIN users u ON se.student_id = u.user_id
        WHERE se.class_id = ?
    `;

    connection.query(query, [classId], (error, results) => {
        if (error) {
            console.error('Error fetching student details:', error);
            return res.status(500).send('Error fetching student details');
        }

        res.json(results);
    });
});

module.exports = router;