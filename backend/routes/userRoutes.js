const express = require("express");
const router = express.Router();
const User = require("../models/User");

// API 1: Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:email/:password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 2: Create user (Registration)
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, githubAccount, phoneNumber, password } =
      req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "firstName, lastName, and email are required" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      githubAccount,
      phoneNumber,
      password,
    });
    await newUser.save();

    res
      .status(201)
      .json({ statusCode: 200, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 3: Get all users (Admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 5: Update user (Admin only)
router.patch("/", async (req, res) => {
  try {
    const { id, roles } = req.body;
    const user = await User.findByIdAndUpdate(id, { roles }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ statusCode: 200, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
