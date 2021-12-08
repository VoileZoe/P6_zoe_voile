const express = require("express");

const app = express();
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

app.post("/api/sauces", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Sauce créée !",
  });
});

app.get("/api/sauces", (req, res, next) => {
  res.status(200).json(null);
});

module.exports = app;
