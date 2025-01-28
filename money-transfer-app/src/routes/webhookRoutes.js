const express = require("express");
const { handleTransferNotification } = require("../controllers/webhookController");

const router = express.Router();

// Webhook endpoint for transfer notifications
router.post("/", handleTransferNotification);

module.exports = router;