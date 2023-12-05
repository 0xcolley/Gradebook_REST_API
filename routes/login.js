const express = require('express');
const router = express.Router();
const loginService = require('../services/login');

router.post('/login', async (req, res) => {
    try {
        const result = await loginService.authenticateUser(req.body);
        if (result.success) {
            res.status(200).json({ token: result.token });
        } 
        else {
            res.status(400).send(result.message);
        }
    } 
    catch (error) {
        console.error("Error processing login:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;