const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customers");
const invoiceRoutes = require("./routes/invoices");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", authRoutes);
app.use("/api", customerRoutes);
app.use("/api", invoiceRoutes);

// Dashboard Route (with test log)
app.use("/api/dashboard", (req, res, next) => {
    console.log("Dashboard route called");
    next();
}, dashboardRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Invoice Management System Backend is Running 🚀");
});

// Test Database
app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err) => {
        if (err) {
            return res.status(500).send("Database connection failed");
        }
        res.send("Database Connected Successfully ✅");
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});