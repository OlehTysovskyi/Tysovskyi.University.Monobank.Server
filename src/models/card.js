const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const User = require("./user");

const Card = sequelize.define(
  "Card",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    number: {
      type: DataTypes.STRING,
      validate: {
        len: [16, 16],
      },
      unique: true,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("BLACK", "WHITE"),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    credit_limit: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
  },
  {
    tableName: "Cards",
  }
);

Card.beforeCreate((card) => {
  const cardTypes = {
    BLACK: 100000,
    WHITE: null,
  };
  card.credit_limit = cardTypes[card.type];
});

Card.getUserCurrentCard = async (userId) => {
  try {
    let card = await Card.findOne({
      where: {
        user_id: userId,
        type: "BLACK",
      },
    });

    if (!card) {
      card = await Card.findOne({
        where: {
          user_id: userId,
          type: "WHITE",
        },
      });
    }

    return card;
  } catch (error) {
    console.error("Error fetching user card:", error);
    throw error;
  }
};

Card.getUserCards = async (userId) => {
  try {
    let cards = await Card.findAll({
      where: {
        user_id: userId,
      },
    });
    return cards;
  } catch (error) {
    console.error("Error fetching user cards:", error);
    throw error;
  }
};

module.exports = Card;
