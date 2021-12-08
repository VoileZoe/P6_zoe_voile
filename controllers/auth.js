const User = require("../models/user");

exports.createUser = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "Use created successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
