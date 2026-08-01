const express = require("express");
const router = express.Router();
const db = require("../db");

// Dashboard API
router.get("/", (req, res) => {

    const statsQuery = `
        SELECT
        (SELECT COUNT(*) FROM customers) AS customers,
        (SELECT COUNT(*) FROM invoices) AS invoices,
        (SELECT IFNULL(SUM(total_amount),0) FROM invoices) AS revenue
    `;


    const invoiceQuery = `
        SELECT
        invoice_number,
        customer_name,
        invoice_date,
        total_amount,
        status
        FROM invoices
        ORDER BY id DESC
        LIMIT 5
    `;


    db.query(statsQuery, (err, stats) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }


        db.query(invoiceQuery, (err, invoices) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }


            res.json({

                customers: stats[0].customers,

                invoices: stats[0].invoices,

                revenue: stats[0].revenue,

                recentInvoices: invoices

            });


        });


    });


});


module.exports = router;