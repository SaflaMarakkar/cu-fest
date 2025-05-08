const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require('mongoose');

// API 9: Get All users registered to a program
router.get("/registered/:programId", async (req, res) => {
  try {
    console.log(req.params.programId);
    
    const users = await User.find({ registeredPrograms: req.params.programId });
    // remove password from response on delete
    const filteredUsers = await users.map((user) => {
      delete user.password;
      return user;
    })
    res.json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 1: Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    // remove password from response
    const filteredData = { ...user._doc };
    delete filteredData.password;
    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:email/:password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    // remove password from response
    delete user.password;
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
      roles: ["User"]
    });
    
    const data = await newUser.save();

    res
      .status(201)
      .json({ statusCode: 200, message: "User created successfully", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 3: Get all users (Admin only)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    // remove password from response on delete
    const filteredUsers = await users.map((user) => {
      delete user.password;
      return user;
    })
    res.json(filteredUsers);
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

// API 6: Program registration
router.patch("/register", async (req, res) => {
  try {
    const { id, registeredPrograms: newProgram } = req.body;
    const user = await User.findByIdAndUpdate(id, { $addToSet: { registeredPrograms: newProgram } }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ statusCode: 200, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 7: Program associate
router.patch("/associate", async (req, res) => {
  try {
    const { id, associatedPrograms: newProgram } = req.body;
    const user = await User.findByIdAndUpdate(id, { $addToSet: { associatedPrograms: newProgram } }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ statusCode: 200, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API 8: Program disassociate
router.patch("/disassociate", async (req, res) => {
  try {
    const { id, associatedPrograms: newProgram } = req.body;
    const user = await User.findByIdAndUpdate(id, { $pull: { associatedPrograms: new mongoose.Types.ObjectId(newProgram[0]) } }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ statusCode: 200, message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
