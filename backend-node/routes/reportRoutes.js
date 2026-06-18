const express = require("express");
const { generateOrdersPaymentsCsv } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/orders-payments.csv", protect, generateOrdersPaymentsCsv);

module.exports = router;
