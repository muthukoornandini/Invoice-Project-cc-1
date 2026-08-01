
   const express = require("express");
const router = express.Router();
const db = require("../db");

// Add Customer
router.post("/customers", (req, res) => {

    const { name, email, phone, address } = req.body;

    const sql = `
        INSERT INTO customers (name, email, phone, address)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, phone, address], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Error adding customer"
            });
        }

        res.json({
            success: true,
            message: "Customer added successfully"
        });

    });

});

// Get Customers
router.get("/customers", (req, res) => {

    db.query("SELECT * FROM customers", (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        res.json(result);

    });

});

module.exports = router;