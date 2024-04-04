const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.use(express.json());

const getUserById = async (req, res) => {
  const user_id = req.params.userId;

  try {
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching user" });
  }
};

module.exports = { getUserById };
