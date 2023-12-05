const express = require('express');
const { connection } = require('../../db.js'); 
const router = express.Router();


router.post('/getAssignmentsForClass', (req, res) => {
    const { classId } = req.body;

    if (!classId) {
        return res.status(400).send('classId is required');
    }

    const query = 'SELECT * FROM assignments WHERE class_id = ?';

    connection.query(query, [classId], (error, results) => {
        if (error) {
            console.error('Error fetching assignments:', error);
            return res.status(500).send('Error fetching assignments');
        }

        res.json(results);
    });
});

module.exports = router;
