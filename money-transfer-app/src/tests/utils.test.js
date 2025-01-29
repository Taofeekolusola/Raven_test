const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const { generateAccountNumber } = require("../utils/generateAccountNumber");

describe("generateAccountNumber", () => {
  it("should generate a valid account number", () => {
    const accountNumber = generateAccountNumber();
    expect(accountNumber).toMatch(/^ACC-\d{10}$/); // Ensures it starts with "ACC-" and has 10 digits
  });

  it("should generate unique account numbers", () => {
    const accountNumber1 = generateAccountNumber();
    const accountNumber2 = generateAccountNumber();
    expect(accountNumber1).not.toBe(accountNumber2); // Ensure two generated account numbers are not the same
  });
});

describe("generateToken", () => {
  const mockId = 123;
  const mockSecret = "testsecret";

  beforeAll(() => {
    process.env.JWT_SECRET = mockSecret; // Sets a test JWT secret
  });

  it("should generate a valid token", () => {
    const token = generateToken(mockId);
    const decoded = jwt.verify(token, mockSecret); // Verify the token
    expect(decoded).toHaveProperty("id", mockId); // Check the payload contains the correct id
  });

  it("should set the token to expire in 7 days", () => {
    const token = generateToken(mockId);
    const decoded = jwt.verify(token, mockSecret);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const expectedExpiry = now + 7 * 24 * 60 * 60; // 7 days from now
    expect(decoded.exp).toBeGreaterThanOrEqual(now);
    expect(decoded.exp).toBeLessThanOrEqual(expectedExpiry);
  });
});