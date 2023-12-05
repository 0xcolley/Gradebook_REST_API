const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql'); 
const router = express.Router();
const dotenv = require('dotenv').config();

const { connection } = require('../db.js'); 

const findUserByUsername = (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (error, results) => {
        if (error) throw error;
        callback(results.length > 0 ? results[0] : null);
    });
};

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    findUserByUsername(username, (user) => {
        if (user && bcrypt.compare(password, user.password_hash)) {
            const token = jwt.sign({
                user_id: user.user_id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                user_type: user.user_type,
                email_address: user.email_address
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token, message: "Successfully logged in" });
            
        } else {
            res.status(401).send('Authentication failed');
        }
    });
});

module.exports = router;
