const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    db.all("SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, rows) => {
        res.json(rows);
    });
});
router.post('/', auth, (req, res) => {
    db.run("INSERT INTO tasks (user_id, title, status) VALUES (?, ?, 0)",
    [req.user.id, req.body.title],
    function() {
        res.json({ id: this.lastID });
    });
});

module.exports = router;
