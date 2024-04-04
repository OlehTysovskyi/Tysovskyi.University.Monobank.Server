require("../controllers/googleAuthController");

const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getUserById } = require("../controllers/userController");
const { registerUser, loginUser } = require("../controllers/authController");
const {
  createCard,
  getUserCards,
  getCardById,
  updateBalance,
} = require("../controllers/cardController");
const {
  createTransfer,
  getUserTransfers,
} = require("../controllers/transferController");

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/get-user-by-id/:userId", getUserById);

router.post("/api/create-card", createCard);
router.get("/api/get-user-cards/:userId", getUserCards);
router.get("/api/get-card-by-id/:cardId", getCardById);
router.post("/api/update-balance", updateBalance);

router.post("/api/create-transfer", createTransfer);
router.get("/api/get-user-transfers/:userId", getUserTransfers);

router.get(
  "/auth/google",
  passport.authenticate("google-auth", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google-auth", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login",
    session: true,
  })
);

const Card = require("../models/card");

router.get("/profile", async (req, res) => {
  try {
    const user = req.user;
    const currentCard = await Card.getUserCurrentCard(user.id);

    res.json({
      user: { id: user.id, username: user.username, email: user.email },
      currentCard: currentCard,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error fetching user profile" });
  }
});

module.exports = router;
