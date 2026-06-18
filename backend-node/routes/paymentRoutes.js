const express = require("express");
const {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getPayments);
router.get("/:id", protect, getPaymentById);
router.post("/", protect, createPayment);
router.put("/:id", protect, updatePayment);
router.delete("/:id", protect, deletePayment);

module.exports = router;