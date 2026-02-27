const Transaction = require("../models/Transaction");

// @desc   Create Buy/Sell Request
// @route  POST /api/transactions
// @access Protected (User)

const createTransaction = async (req, res) => {
  try {
    const { symbol, quantity, price, type } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      symbol,
      quantity,
      price,
      type,
    });

    res.status(201).json(transaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all transactions (Admin)
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("user", "name email role");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve / Reject transaction (Admin)
const updateTransactionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.status = status;
    await transaction.save();

    res.json(transaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's transactions
const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.json(transactions);
    console.log("User ID from token:", req.user._id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  updateTransactionStatus,
  getMyTransactions,
};