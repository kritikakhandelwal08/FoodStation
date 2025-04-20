import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Kitchen from '../modals/Kitchen.js';

const router = express.Router();
const JWT_SECRET = "mysecretkey"; // Replace with a secure secret key

// Register a new kitchen
router.post("/register", async (req, res) => {
  const {
    kitchenName,
    ownerName,
    ownerEmail,
    contactNumber,
    kitchenAddress,
    city,
    state,
    password
  } = req.body;

  // Check if all fields are provided
  if (!kitchenName || !ownerName || !ownerEmail || !contactNumber || !kitchenAddress || !city || !state || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if a kitchen with the same email already exists
    const existingKitchen = await Kitchen.findOne({ ownerEmail });
    if (existingKitchen) {
      return res.status(400).json({ message: "Kitchen with this email already exists." });
    }

    // Create a new kitchen
    const kitchen = new Kitchen({
      kitchenName,
      ownerName,
      ownerEmail,
      contactNumber,
      kitchenAddress,
      city,
      state,
      password,
    });

    await kitchen.save();

    // Generate a JWT token
    const token = jwt.sign({ id: kitchen._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Kitchen registered successfully", token });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login an existing kitchen
router.post("/login", async (req, res) => {
  const { ownerEmail, password } = req.body;

  // Check if email and password are provided
  if (!ownerEmail || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    // Check if kitchen exists
    const kitchen = await Kitchen.findOne({ ownerEmail });
    if (!kitchen) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isPasswordValid = await kitchen.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: kitchen._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected route (example)
router.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const kitchen = await Kitchen.findById(decoded.id).select("-password");
    res.status(200).json({ kitchen });
  } catch (err) {
    console.error("Error in profile route:", err);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
});

export default router;
