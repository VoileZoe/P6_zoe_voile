const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const sauceRoutes = require("./routes/sauce");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MG_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log(err));

const app = express();

// helmet security
app.use(helmet());

// parse the request body
app.use(express.json());

// cors to accept requests from all origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// routes
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);

app.use("/api/sauces", sauceRoutes);

module.exports = app;
