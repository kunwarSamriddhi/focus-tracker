const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.JWT_SECRET_KEY;
const fetchusers = require("../middleware/fetchusers");
const Session = require("../models/Session");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ message: "Invalid cridentials." });
    }

    const token = jwt.sign({ id: user._id }, key, { expiresIn: 3600 });
    res.status(200).json({ id: user._id, email, token });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/me", fetchusers, async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user).select("email");
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/start-session", fetchusers, async (req, res) => {
  try {
    const session = await Session.create({
      user: req.user,
      startTime: new Date(),
      endTime: null,
    });

    return res.status(201).json({ message: "Session started", session });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/end-session", fetchusers, async (req, res) => {
  try {
    const session = await Session.findOne({
      user: req.user,
      endTime: null,
    });

    if (!session) {
      return res.status(400).json({ message: "No active session found." });
    }

    session.endTime = new Date();
    await session.save();

    return res
      .status(200)
      .json({ message: "Session ended successfully.", session });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/get-session", fetchusers, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user }).sort({
      startTime: -1,
    });

    return res.status(200).json(sessions);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
