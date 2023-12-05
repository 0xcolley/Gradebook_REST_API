const express = require('express');
const { connection } = require('../../db.js');
const router = express.Router();

router.post('/addAssignment', (req, res) => {
    const { name, type, classId, weight } = req.body;

    // Validate the input
    if (!name || !type || !classId || weight === undefined) {
        return res.status(400).send('Missing required assignment details');
    }

    const query = 'INSERT INTO assignments (name, type, class_id, weight) VALUES (?, ?, ?, ?)';

    connection.query(query, [name, type, classId, weight], (error, results) => {
        if (error) {
            console.error('Error adding assignment:', error);
            return res.status(500).send('Error adding assignment');
        }

        res.status(201).send({ message: 'Assignment added successfully', assignmentId: results.insertId });
    });
});

module.exports = router;
