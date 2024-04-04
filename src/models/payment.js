const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    sender_card_num: {
      type: DataTypes.STRING,
      validate: {
        len: [16, 16],
      },
      allowNull: false,
    },
    recipient_IBAN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PAID", "UNPAID"),
      defaultValue: "UNPAID",
    },
  },
  {
    tableName: "Payments",
  }
);

module.exports = Payment;
