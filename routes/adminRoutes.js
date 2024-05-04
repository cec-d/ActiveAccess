const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../authMiddleware'); 


router.post('/addClass', requireAdmin, (req, res) => {
    // Logic to add a class
    res.send('Class added successfully');
});

router.delete('/removeClass/:id', requireAdmin, (req, res) => {
    // Logic to remove a class
    res.send('Class removed successfully');
});

module.exports = router;