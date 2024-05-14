const { sequelize } = require("../../config/database");
const User = require("../models/user");
const Card = require("../models/card");
const Account = require("../models/account");
const Transfer = require("../models/transfer");
const Payment = require("../models/payment");
const Loan = require("../models/loan");
const Bank = require("../models/bank");

async function createTables() {
  try {
    // await sequelize.sync();
    await User.sync();
    await Card.sync();
    await Account.sync();
    await Transfer.sync();
    await Payment.sync();
    // await Loan.sync();
    await Bank.sync();

    // await Account.update({ balance: 12053.52 }, { where: { account_id: 4 } });
    console.log("<-Tables created successfully->");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

module.exports = createTables;
