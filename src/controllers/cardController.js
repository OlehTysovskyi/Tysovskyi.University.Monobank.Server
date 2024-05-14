const Card = require("../models/card");

const User = require("../models/user");

async function generateUniqueCardNumber() {
  const cardLength = 16;
  const characters = "0123456789";
  let card_number;

  while (true) {
    card_number = "";
    for (let i = 0; i < cardLength; i++) {
      card_number += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    const existingCard = await Card.findOne({
      where: { number: card_number },
    });
    if (!existingCard) {
      break;
    }
  }

  return card_number;
}

async function createCard(req, res) {
  try {
    const { user_id, type, balance } = req.body;
    const current_date = new Date();
    const expiry_date = new Date(
      current_date.getFullYear() + 10,
      current_date.getMonth(),
      current_date.getDate()
    );

    const card_number = await generateUniqueCardNumber();

    const card = await Card.create({
      user_id: user_id,
      number: card_number,
      type: type,
      balance: balance,
      expiry_date: expiry_date,
    });

    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while creating card" });
  }
}

const getCardById = async (req, res) => {
  try {
    const card_id = req.params.cardId;

    const card = await Card.findOne({
      where: { id: card_id },
    });
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.status(200).send({ card: card });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching card" });
  }
};

const getUserCards = async (req, res) => {
  try {
    const user_id = req.params.userId;

    const cards = await Card.getUserCards(user_id);
    res.status(200).send({ cards: cards });
  } catch (error) {
    console.error("Error while fetching user cards:", error);
    res.status(500).json({ error: "Error while fetching user cards" });
  }
};

const getUserByCardNum = async (card_number) => {
  try {
    const card = await Card.findOne({ where: { number: card_number } });
    if (!card) {
      throw new Error("Card not found");
    }

    const user = await User.findOne({ where: { id: card.user_id } });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error while fetching username:", error);
    throw new Error("Error while fetching username");
  }
};

const updateBalance = async (req, res) => {
  try {
    const { sender_card_num, amount } = req.body;

    const card = await Card.findOne({ where: { number: sender_card_num } });
    if (!card) {
      throw new Error("Card not found");
    }

    card.balance -= amount;
    await card.save();

    res.status(201).json({ card: card });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createCard,
  getUserCards,
  getCardById,
  getUserByCardNum,
  updateBalance,
};
