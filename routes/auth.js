const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.length > 0) {
            res.json({
                success: true,
                message: "Login successful"
            });
        } else {
            res.json({
                success: false,
                message: "Invalid username or password"
            });
        }

    });

});

module.exports = router;