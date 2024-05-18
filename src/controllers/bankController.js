const Bank = require("../models/bank");

const User = require("../models/user");

async function createBank(req, res) {
  try {
    const { user_id, name, goal_amount } = req.body;

    const bank = await Bank.create({
      user_id: user_id,
      name: name,
      goal_amount: goal_amount,
      balance: 0,
      deposit_amount: 0,
      withdraw_amount: 0,
    });

    res.status(201).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateBank = async (req, res) => {
  try {
    const {
      bank_id,
      name,
      goal_amount,
      balance,
      deposit_amount,
      withdraw_amount,
    } = req.body;

    const bank = await Bank.findByPk(bank_id);
    if (!bank) {
      return res.status(404).json({ error: "Bank not found" });
    }

    bank.name = name || bank.name;
    bank.goal_amount = goal_amount || bank.goal_amount;
    bank.balance = balance || bank.balance;
    bank.deposit_amount = deposit_amount || bank.deposit_amount;
    bank.withdraw_amount = withdraw_amount || bank.withdraw_amount;

    await bank.save();
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBank = async (req, res) => {
  try {
    const bank_id = req.params.bankId;

    const bank = await Bank.findByPk(bank_id);
    if (!bank) {
      return res.status(404).json({ error: "Bank not found" });
    }

    await bank.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBankById = async () => {
  try {
    const bank_id = req.params.bankId;

    console.error("Bank Id: " + bank_id);

    const bank = await Bank.findOne({ where: { id: bank_id } });
    if (!bank) {
      return res.status(404).json({ error: "Bank not found" });
    }

    console.error("Bank: " + bank);

    res.status(200).json({ bank: bank });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserBanks = async (req, res) => {
  try {
    const user_id = req.params.userId;

    const banks = await Bank.findAll({ where: { user_id: user_id } });
    res.status(200).json({ banks: banks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBank,
  updateBank,
  deleteBank,
  getBankById,
  getUserBanks,
};
