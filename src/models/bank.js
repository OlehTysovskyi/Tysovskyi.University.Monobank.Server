const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const User = require("./user");

const Bank = sequelize.define(
  "Bank",
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
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    goal_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    deposit_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    withdraw_amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Banks",
  }
);

module.exports = Bank;
