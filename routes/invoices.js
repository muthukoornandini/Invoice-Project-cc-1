const express = require("express");
const router = express.Router();
const db = require("../db");


// Add Invoice
router.post("/invoices", (req, res) => {

    const {
        invoice_number,
        customer_name,
        invoice_date,
        total_amount,
        status
    } = req.body;

    const sql = `
        INSERT INTO invoices
        (invoice_number, customer_name, invoice_date, total_amount, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            invoice_number,
            customer_name,
            invoice_date,
            total_amount,
            status
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Error adding invoice"
                });
            }

            res.json({
                success: true,
                message: "Invoice added successfully"
            });

        }
    );

});


// Get All Invoices
router.get("/invoices", (req, res) => {

    db.query("SELECT * FROM invoices", (err, result) => {

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