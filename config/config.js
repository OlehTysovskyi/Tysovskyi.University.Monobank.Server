const dotenv = require("dotenv");
dotenv.config("../.env");

module.exports = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientUrl: process.env.CLIENT_URL,
};
