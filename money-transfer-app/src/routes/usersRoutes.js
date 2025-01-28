const express = require("express");
const { protect } = require("../middlewares/auth")
const {
    signup,
    login,
    getUserProfile
} = require("../controllers/usersController");

const router = express.Router();

// User signup route
router.post("/signup", signup);

// User login route
router.post("/login", login);

// User profile route
router.get("/profile", protect, getUserProfile);

module.exports = router;