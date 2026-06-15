const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    db.run("INSERT INTO users (username, password) VALUES (?, ?)",
    [req.body.username, hash],
    function(err) {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});
router.post('/login', (req, res) => {
    db.get(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    async (err, user) => {

        console.log("Login user:", user);

        if (!user)
            return res.status(403).send("User not found");

        const valid =
            await bcrypt.compare(
                req.body.password,
                user.password
            );

        if (!valid)
            return res.status(403).send("Wrong password");

        const token =
            jwt.sign(
                { id: user.id },
                'secret'
            );

        res.json({ token });
    }
);
});

module.exports = router;
