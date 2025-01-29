const db = require("../db");

// Handle deposit
const depositFunds = async (req, res) => {
  try {
    const { amount, transaction_id, payment_method, status } = req.body;
    const user_id = req.user.id

    // Validate input fields
    if (!user_id || !amount || !transaction_id || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user exists
    const user = await db("account").where({ user_id: user_id }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Only process deposit if successful
    if (status === "success") {
      // Update the user's balance
      await db("account")
        .where({ user_id: user_id })
        .update({
          balance: user.balance + amount, // Add deposited amount to current balance
        });

      // Log the transaction in the transactions table
      await db("transactions").insert({
        user_id,
        amount,
        transaction_id,
        status: "success", // Deposit was successful
        payment_method,
        created_at: new Date(),
      });

      return res.status(200).json({
        message: "Deposit successful, balance updated",
      });
    } else {
      // If deposit failed, log failure
      await db("transactions").insert({
        user_id,
        amount,
        transaction_id,
        status: "failed",
        payment_method,
        created_at: new Date(),
      });

      return res.status(400).json({
        message: "Deposit failed, status not successful",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process deposit" });
  }
};

// Get deposits for a user
const getUserDeposits = async (req, res) => {
  try {
    const userId = req.user.id;

    const deposits = await db("transactions")
      .where({ user_id: userId, type: "deposit" })
      .select("*");

    res.status(200).json({
      message: "User deposits retrieved successfully",
      data: deposits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve deposits" });
  }
};

// Get transfers for a user
const getUserTransfers = async (req, res) => {
  try {
    const userId = req.user.id;

    const transfers = await db("transactions")
      .where({ user_id: userId, type: "transfer" })
      .select("*");

    res.status(200).json({
      message: "User transfers retrieved successfully",
      data: transfers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve transfers" });
  }
};

// Get complete transaction history for a user
const getUserTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await db("transactions")
      .where({ user_id: userId })
      .select("*")
      .orderBy("created_at", "desc");

    res.status(200).json({
      message: "User transaction history retrieved successfully",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve transaction history" });
  }
};

module.exports = {
  getUserDeposits,
  getUserTransfers,
  getUserTransactionHistory,
  depositFunds
};