const express = require("express");
const { getSystemStatus } = require("../controllers/systemController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/status", protect, getSystemStatus);

module.exports = router;