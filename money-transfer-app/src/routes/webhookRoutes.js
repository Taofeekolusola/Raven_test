const express = require("express");
const { handleDepositNotification } = require("../controllers/webhookController");

const router = express.Router();

// Webhook route to listen for deposit notifications
router.post("/deposit-webhook", handleDepositNotification);

module.exports = router;