const Sauce = require("../models/sauce");
const jwt = require("jsonwebtoken");

// exports.getAll = (req, res, next) => {};

// exports.getOne = (req, res, next) => {};

exports.createOne = (req, res, next) => {
  console.log("coucou");
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => {
      console.log("prout par exemple");
      res.status(201).json({ message: "Sauce enregistrée !" });
    })
    .catch((error) => {
      console.log("rototo par exemple " + error);

      res.status(400).json({ error: "caca" });
    });
};

// exports.updateOne = (req, res, next) => {};

// exports.deleteOne = (req, res, next) => {};

// exports.setLike = (req, res, next) => {};