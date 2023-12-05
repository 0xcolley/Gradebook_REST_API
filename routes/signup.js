const express = require('express');
const router = express.Router();
const signupService = require('../services/signup');

router.post('/signup', async (req, res) => {
    try {
        const result = await signupService.registerUser(req.body);
        if (result.success) {
            res.status(201).send('User created successfully!');
        } 
        else {
            res.status(400).send(result.message);
        }
    } 
    catch (error) {
        console.error("Error processing signup:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;