const db = require('../db')
const handleTransferNotification = async (req, res) => {
  try {
    const { reference, description, amount, type, account_id } = req.body;

    // Verify that required fields are present
    if (!reference || !description || !amount) {
      return res.status(400).json({ error: "Invalid notification payload" });
    }

    // Log the webhook payload for debugging
    console.log("Webhook Payload:", req.body);

    // Handle successful transfer
    if (description === "success") {
      // Example: Update transaction status in your database
      await db("transactions")
        .where({ reference })
        .update({ description: "success", updated_at: new Date() });

      console.log(`Transfer with reference ${reference} marked as successful.`);
    }

    res.status(200).json({ message: "Webhook received and processed successfully." });
  } catch (error) {
    console.error("Error processing webhook:", error.message);
    res.status(500).json({ error: "Failed to process webhook" });
  }
};

module.exports = { handleTransferNotification };