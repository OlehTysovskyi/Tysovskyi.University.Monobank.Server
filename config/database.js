const { Sequelize } = require("sequelize");
const tedious = require("tedious");

const sequelize = new Sequelize("monobank", "tysyk-monobank", "A2s4D6f8", {
  host: "monobank.database.windows.net",
  dialect: "mssql",
  dialectModule: tedious,
  dialectOptions: {
    options: {
      encrypt: true,
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("<-Connected to database successfully.->");
  } catch (error) {
    console.error("!-Error while connecting to database:", error);
  }
}

module.exports = {
  sequelize,
  testConnection,
};
