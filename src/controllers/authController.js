const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const Card = require("../models/card");
const { sendEmail } = require("../utils/sendEmail");

router.use(express.json());

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const currentCard = await Card.getUserCurrentCard(user.id);

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
      currentCard: currentCard,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Error logging in" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ message: "This email is already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email,
      password_hash: hashedPassword,
    });

    await sendEmail(email);

    res
      .status(201)
      .json({ message: "User registered successfully", user: user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

module.exports = { registerUser, loginUser };
