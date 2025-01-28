const handleDepositNotification = async (req, res) => {
    try {
      // Parse the webhook payload
      const { user_id, amount, status, transaction_id } = req.body;
  
      // Verify that all required data is present in the payload
      if (!user_id || !amount || !status || !transaction_id) {
        return res.status(400).json({ error: "Missing required data." });
      }
  
      // You can also verify the webhook source or signature to ensure it's from Raven Atlas
  
      // Update the user's balance in the database (this can vary based on your data structure)
      const user = await db("users").where({ id: user_id }).first();
      
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      // Here you can update the user's balance or transaction history based on the deposit
      // For simplicity, assume we have a balance field in the users table
      if (status === "success") {
        await db("users").where({ id: user_id }).update({
          balance: user.balance + amount, // Increment user's balance by deposit amount
        });
  
        // You may also want to store the transaction history in a separate table
        await db("transactions").insert({
          user_id,
          amount,
          transaction_id,
          type: "deposit",
          status: "success",
        });
      }
  
      // Respond with a success message
      res.status(200).json({ message: "Deposit notification received and processed." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to process the deposit notification." });
    }
  };
  
  module.exports = { handleDepositNotification };