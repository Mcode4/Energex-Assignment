const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.get('', async(req, res) => {
    // Fetch all posts (cached in Redis)
});

router.post('', async(req, res) => {
    // Create a new post (title, content, user_id)
});

router.get('/:id', (req, res) => {
    // Fetch a single post (cached in Redis)
});

module.exports = router;