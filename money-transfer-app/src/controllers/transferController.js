const axios = require("axios");

const initiateBankTransfer = async (req, res) => {
  try {
    const { amount, bank, bank_code, account_number, status, reference } = req.body;

    // Validate required fields
    if (!amount || !bank || !bank_code || !account_number || !reference) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Using secret key:", process.env.RAVEN_SECRET_KEY);
    // Prepare transfer payload
    const transferPayload = {
      amount,
      bank,
      bank_code,
      account_number,
      status: status || "Payment Transfer",
      reference,
      currency: "NGN", // Assuming Nigerian currency
    };

    // Make the API request to Raven Atlas
    const response = await axios.post(
      "https://integrations.getravenbank.com/v1/transfers/create",
      transferPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.RAVEN_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    

    // Response from Raven Atlas
    const transferResponse = response.data;
    res.status(200).json({ message: "Transfer initiated successfully", transferResponse });
  } catch (error) {
    console.error("Error initiating transfer:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate transfer" });
  }
};

module.exports = { initiateBankTransfer };