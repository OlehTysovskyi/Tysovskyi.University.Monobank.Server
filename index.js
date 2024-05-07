const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { testConnection } = require("./config/database");
const createTables = require("./src/utils/createTables");

const app = express();
const { clientUrl } = require("./config/config");

app.use(express.json());

app.use(session({ secret: "secret", saveUninitialized: false, resave: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: clientUrl,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("Hello World from server!");
});

app.use(require("./src/routes/routes"));

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  console.log(`Server is starting on port ${PORT}`);
  try {
    await testConnection();
    console.log("Database connection successful!");
    await createTables();
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error connecting to database or creating tables:", error);
  }
});
