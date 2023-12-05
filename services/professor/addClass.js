const dotenv = require('dotenv').config();
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

router.post('/addclass', authenticateToken, (req, res) => {
  const { name } = req.body; 
  const professor_id = req.user.user_id; 

  if (req.user.user_type !== 'PROFESSOR') {
    return res.status(403).send('Only professors can add classes.');
  }

  const sql = 'INSERT INTO classes (name, professor_id) VALUES (?, ?)';

  connection.query(sql, [name, professor_id], (err, result) => {
    if (err) {
      console.error('Error adding class:', err);
      return res.status(500).send('Error adding class');
    }

    res.status(201).send({ class_id: result.insertId, name, professor_id });
  });
});

module.exports = router;
