const express = require('express');
const { connection } = require('../../db.js');
const router = express.Router();


router.post('/enrollStudent', (req, res) => {
    const { email, classId } = req.body;

    if (!email || !classId) {
        return res.status(400).send('Missing email or classId');
    }

    const studentQuery = 'SELECT user_id FROM users WHERE email_address = ?';

    connection.query(studentQuery, [email], (studentError, studentResults) => {
        if (studentError) {
            console.error('Error finding student:', studentError);
            return res.status(500).send('Error finding student');
        }

        if (studentResults.length === 0) {
            return res.status(404).send('Student not found');
        }

        const studentId = studentResults[0].user_id;

        const enrollQuery = 'INSERT INTO student_enrollment (student_id, class_id) VALUES (?, ?)';
        connection.query(enrollQuery, [studentId, classId], (enrollError, enrollResult) => {
            if (enrollError) {
                console.error('Error enrolling student:', enrollError);
                return res.status(500).send('Error enrolling student');
            }

            res.status(201).send({ message: 'Student enrolled successfully', enrollmentId: enrollResult.insertId });
        });
    });
});

module.exports = router;
