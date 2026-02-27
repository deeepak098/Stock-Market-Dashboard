const express = require("express");
const router = express.Router();

const {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} = require("../controllers/watchlistController");

const { protect } = require("../middleware/authMiddleware");

// Get watchlist
router.get("/", protect, getWatchlist);

// Add to watchlist
router.post("/", protect, addToWatchlist);

// Remove from watchlist
router.delete("/", protect, removeFromWatchlist);

module.exports = router;