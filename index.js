const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const app = express();
const { clientUrl } = require("./config/config");

// app.use(
//   cors({
//     origin: "https://tysovskyi-university-monobank-client.vercel.app/",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//     credentials: true,
//   })
// );

app.use(express.json());

app.use(
  session({
    cookie: {
      secure: true,
      maxAge: 60000,
    },
    store: new RedisStore(),
    secret: "secret",
    saveUninitialized: true,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World from server!");
});

app.use(require("./src/routes/routes"));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

const { testConnection } = require("./config/database");
testConnection();

const createTables = require("./src/utils/createTables");
createTables();
