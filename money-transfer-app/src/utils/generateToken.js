const jwt = require("jsonwebtoken");

// Utility function to generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
  
module.exports = generateToken;