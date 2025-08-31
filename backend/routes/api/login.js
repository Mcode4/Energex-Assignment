const express = require('express');
const router = express.Router();
const connection = require('../../db');

router.post('', async(req, res) => {
    // Authenticate user and return JWT token
    console.log('REQ RECEIVED LOGIN: ', req.body)
    const { email, password } = req.body

    connection.query(
        'SELECT email FROM users WHERE email = ?',
        email,
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.length > 0) {
                console.log('FOUND USER');
                connection.query(
                    'SELECT email, password FROM users WHERE email = ? AND password = ?',
                    [email, password],
                    (err2, results2) => {
                        console.log('ERR2": ', err2, 'RESULTS2:', results2)
                        if(err2) return res.status(500).json({ error: 'Database error at password check' });;
                        
                        if(results2.length > 0) {
                            res.json({ message: 'User found' });
                        } else {
                            res.status(400).json({ error: 'Incorrect password'})
                        }
                    }
                );
                
            } else {
                console.log('USER NOT FOUND');
                res.status(404).json({ message: 'User not found' });
            }
        }
    );
});

module.exports = router;