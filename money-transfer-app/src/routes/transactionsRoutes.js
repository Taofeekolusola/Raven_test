const express = require("express");
const {
  getUserDeposits,
  getUserTransfers,
  getUserTransactionHistory,
  depositFunds
} = require("../controllers/transactionsController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

// Route to get user deposits
router.get("/deposits", protect, getUserDeposits);

// Route to get user transfers
router.get("/transfers", protect, getUserTransfers);

// Route to get user transaction history
router.get("/history", protect, getUserTransactionHistory);

// Route to handle deposit
router.post("/deposit", protect, depositFunds);

module.exports = router;