const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(
  session({ secret: "asdadadadad", saveUninitialized: false, resave: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/routes"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});

const { testConnection } = require("../config/database");
testConnection();

const createTables = require("./utils/createTables");
createTables();
