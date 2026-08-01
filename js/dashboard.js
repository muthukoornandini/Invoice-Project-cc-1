const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

    const query = `
        SELECT
        (SELECT COUNT(*) FROM customers) AS customers,
        (SELECT COUNT(*) FROM invoices) AS invoices,
        (SELECT IFNULL(SUM(total_amount),0) FROM invoices) AS revenue
    `;


    const invoiceQuery = `
        SELECT 
        invoice_number,
        customer_name,
        total_amount,
        status
        FROM invoices
        ORDER BY id DESC
        LIMIT 5
    `;


    db.query(query, (err, result) => {

        if(err){
            console.log(err);
            return res.status(500).json(err);
        }


        db.query(invoiceQuery, (err, invoiceData) => {

            if(err){
                console.log(err);
                return res.status(500).json(err);
            }


            console.log("Recent invoices:", invoiceData);


            res.json({

                customers: result[0].customers,

                invoices: result[0].invoices,

                revenue: result[0].revenue,

                recentInvoices: invoiceData

            });


        });


    });


});


module.exports = router;