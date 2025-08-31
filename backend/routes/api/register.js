const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.post('', async(req, res) => {
    // Register a new user (name, email, password)
    console.log('REQ RECEIVED SIGN UP: ', req)
    const { name, email, password } = req.body

    connection.query(
        'SELECT email FROM users WHERE email = ?',
        [email],
        (err, results) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            } if (results.length > 0) {
                console.log('FOUND USER');
                res.json({ message: 'User found' });
            } else {
                const newUser = { name, email, password }
                connection.query('INSERT INTO users SET ?', newUser, (err2, result2) => {
                    if(err2) return res.status(500).json({ error: "Database couldn't insert user"})
                    console.log('Data inserted:', result2.insertId);
                })
            }
        }
    )
});


module.exports = router;