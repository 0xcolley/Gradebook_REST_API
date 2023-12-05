const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql'); 
const router = express.Router();
const dotenv = require('dotenv').config();

const { connection } = require('../db.js'); 

//professor leonards example user for the report usage of api
router.get('/exampleJWT', (req, res) => {
    const token = jwt.sign({
        user_id: 18,
        username: 'jdleonard',
        firstname: 'John',
        lastname: 'Leonard',
        user_type: 'PROFESSOR',
        email_address: 'jdleonard@vcu.edu',
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: "example token delivered" });
});
module.exports = router;
