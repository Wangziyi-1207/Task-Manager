const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

/*
 * Get all tasks
 */
router.get('/', auth, (req, res) => {

    db.all(
        'SELECT * FROM tasks WHERE user_id = ?',
        [req.user.id],
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);
        }
    );

});

/*
 * Create task
 */
router.post('/', auth, (req, res) => {

    db.run(
        'INSERT INTO tasks (user_id, title, status) VALUES (?, ?, 0)',
        [req.user.id, req.body.title],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                id: this.lastID,
                message: 'Task created'
            });

        }
    );

});

/*
 * Delete task
 */
router.delete('/:id', auth, (req, res) => {

    db.run(
        'DELETE FROM tasks WHERE id = ? AND user_id = ?',
        [req.params.id, req.user.id],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                deleted: this.changes
            });

        }
    );

});

/*
 * Task statistics
 */
router.get('/stats', auth, (req, res) => {

    db.get(
        `
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS completed
        FROM tasks
        WHERE user_id = ?
        `,
        [req.user.id],
        (err, row) => {

            if (err) {
                return res.status(500).json(err);
            }

            const total = row.total || 0;
            const completed = row.completed || 0;

            res.json({
                total,
                completed,
                completionRate:
                    total === 0
                        ? 0
                        : ((completed / total) * 100).toFixed(2)
            });

        }
    );

});

module.exports = router;
