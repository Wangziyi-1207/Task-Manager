const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*
 * Register
 */
router.post('/register', async (req, res) => {

    console.log('Register Request:', req.body);

    try {

        const hash = await bcrypt.hash(
            req.body.password,
            10
        );

        db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [req.body.username, hash],
            function (err) {

                if (err) {
                    console.log('Register Error:', err);
                    return res.status(400).send(err.message);
                }

                console.log(
                    'Inserted User ID:',
                    this.lastID
                );

                res.sendStatus(200);
            }
        );

    } catch (error) {

        console.log(error);
        res.status(500).send(error.message);

    }

});

/*
 * Login
 */
router.post('/login', (req, res) => {

    console.log('Login Request:', req.body);

    // 查看数据库里所有用户
    db.all(
        'SELECT * FROM users',
        [],
        (err, rows) => {

            if (err) {
                console.log(err);
            } else {
                console.log('All Users:', rows);
            }

        }
    );

    db.get(
        'SELECT * FROM users WHERE username = ?',
        [req.body.username],
        async (err, user) => {

            console.log('Login User:', user);

            if (err) {
                console.log(err);
                return res.status(500).send(err.message);
            }

            if (!user) {
                return res
                    .status(403)
                    .send('User not found');
            }

            const valid =
                await bcrypt.compare(
                    req.body.password,
                    user.password
                );

            if (!valid) {
                return res
                    .status(403)
                    .send('Wrong password');
            }

            const token = jwt.sign(
                { id: user.id },
                'secret'
            );

            console.log(
                'Login Success:',
                user.username
            );

            res.json({
                token
            });

        }
    );

});

module.exports = router;
