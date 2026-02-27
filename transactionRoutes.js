const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getAllTransactions,
  updateTransactionStatus,
  getMyTransactions,
} = require("../controllers/transactionController");


const { protect, admin } = require("../middleware/authMiddleware");

// User creates transaction
router.post("/", protect, createTransaction);

// User views own transactions
router.get("/my", protect, getMyTransactions);

// Admin views all transactions
router.get("/", protect, admin, getAllTransactions);

// Admin updates status
router.put("/:id", protect, admin, updateTransactionStatus);


module.exports = router;