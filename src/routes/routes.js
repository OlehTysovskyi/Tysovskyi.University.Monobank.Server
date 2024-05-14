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
const {
  createBank,
  updateBank,
  deleteBank,
  getBankById,
  getUserBanks,
} = require("../controllers/bankController");

//===========================================All-Routes===========================================

// User Routes
router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/get-user-by-id/:userId", getUserById);

//Card Routes
router.post("/api/create-card", createCard);
router.get("/api/get-card-by-id/:cardId", getCardById);
router.get("/api/get-user-cards/:userId", getUserCards);
router.post("/api/update-balance", updateBalance);

//Transfer Routes
router.post("/api/create-transfer", createTransfer);
router.get("/api/get-user-transfers/:userId", getUserTransfers);

//Bank Routes
router.post("/api/create-bank", createBank);
router.post("/api/update-bank", updateBank);
router.post("/api/delete-bank", deleteBank);
router.get("/api/get-bank-by-id/:bankId", getBankById);
router.get("/api/get-user-banks/:userId", getUserBanks);

//Google Auth Routes
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

//Email Sender Routes
const { sendSupportEmail } = require("../utils/sendEmail");

router.post("/api/send-support-email", sendSupportEmail);

module.exports = router;
