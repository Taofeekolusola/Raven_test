const express = require("express");
const { initiateBankTransfer } = require("../controllers/transferController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

// Bank transfer route (authenticated)
router.post("/", protect, initiateBankTransfer);

module.exports = router;
