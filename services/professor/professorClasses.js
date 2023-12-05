const express = require('express');
const jwt = require('jsonwebtoken');
const { connection } = require('../../db.js');
const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.get('/getClassesForProfessor', authenticateToken, (req, res) => {
  const professorId = req.user.user_id;
  const query = 'SELECT * FROM classes WHERE professor_id = ?';

  connection.query(query, [professorId], (error, results) => {
    if (error) {
      console.error('Error fetching classes:', error);
      return res.status(500).send('Error fetching classes');
    }

    res.json(results);
  });
});

module.exports = router;