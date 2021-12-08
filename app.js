const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const sauceRoutes = require("./routes/sauce");

mongoose
  .connect(
    "mongodb+srv://ZVOCRStudent:jC8ywy4Mdm5uaGp@cluster0.op7yy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log(err));

const app = express();

app.use(helmet());

app.use(express.json());

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

app.use("/api/auth", authRoutes);

app.use("/api/sauces", sauceRoutes);

module.exports = app;
