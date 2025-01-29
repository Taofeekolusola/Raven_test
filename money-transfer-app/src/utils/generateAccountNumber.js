const generateAccountNumber = () => {
    return `ACC-${Math.floor(1000000000 + Math.random() * 9000000000)}`; // Generates a 10-digit account number
  };
  
module.exports = { generateAccountNumber };