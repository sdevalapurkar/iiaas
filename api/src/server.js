const express = require("express");
const morgan = require("morgan");
const knex = require("knex");
const getCurrentInteger = require("../src/paths/integer/current/get");
const getNextInteger = require("./paths/integer/next");
const resetCurrentInteger = require("./paths/integer/current/put");
const registerUser = require("./paths/register");
const loginUser = require("./paths/login");

const db = knex({
  client: "postgres",
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan("dev"));
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Authorization, responseType"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");
  res.charset = "utf-8"; // setting due to this issue: https://github.com/json-api/json-api/issues/1547#issuecomment-807087361
  res.setHeader("Content-Type", "application/vnd.api+json");

  next();
});

// Root endpoint (health check)
app.get("/", (req, res) => {
  res.send("Welcome to the IIAAS API!");
});

// Get the current integer
app.get("/v1/current", async (req, res) => {
  return getCurrentInteger(req, res, db);
});

// Get the next integer in the sequence
app.get("/v1/next", async (req, res) => {
  return getNextInteger(req, res, db);
});

// Reset integer value
app.put("/v1/current", async (req, res) => {
  return resetCurrentInteger(req, res, db);
});

// Register as a new user
app.post("/v1/register", async (req, res) => {
  return registerUser(req, res, db);
});

// Login as an existing user
app.post("/v1/login", async (req, res) => {
  return loginUser(req, res, db);
});

// API is listening and server is up
app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));
