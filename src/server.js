const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const app = express();
const { clientUrl } = require("../config/config");

app.use(
  cors({
    origin: clientUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({ secret: "asdadadadad", saveUninitialized: false, resave: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World from server!");
});

app.use(require("./routes/routes"));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

const { testConnection } = require("../config/database");
testConnection();

const createTables = require("./utils/createTables");
const { clientUrl } = require("../config/config");
createTables();
