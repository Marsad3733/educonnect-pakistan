const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ✅ Make sure path is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "your-secret-key";

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: "1h" });
    res.json({ token, userId: user._id, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

module.exports = router;
