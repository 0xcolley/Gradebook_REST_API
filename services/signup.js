const express = require('express');
const { connection } = require('../db.js'); 

const router = express.Router();

async function registerUser({ username, first_name, last_name, password, user_type, email_address}) {
    try {
        const [users] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]); //promise for async await

        if (users.length > 0) {
            return { success: false, message: 'Invalid: Username already exists.' };
        } else {
            await connection.promise().query('INSERT INTO users (username, firstname, lastname, password_hash, user_type, email_address) VALUES (?, ?, ?, ?, ?, ?)',
                [username, first_name, last_name, password, user_type, email_address]
            );
            return { success: true };
        }
    } 
    catch (error) {
        console.error("Error in registerUser:", error);
        throw error;
    }
}

router.post('/signup', async (req, res) => {
    try {
        let { username, firstName: first_name, lastName: last_name, password, role: user_type, email_address} = req.body;
        user_type = user_type.toString().toUpperCase();
        console.log(username, first_name, last_name, password, user_type, email_address);
        
        const result = await registerUser({ username, first_name, last_name, password, user_type, email_address});
        if (result.success) {
            res.status(200).json({ message: "User registered successfully" });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
