const express = require("express");
const router = express.Router();

const { getStockBySymbol } = require("../controllers/stockController");
const { protect } = require("../middleware/authMiddleware");

// Protected route
router.get("/:symbol", protect, getStockBySymbol);

module.exports = router;