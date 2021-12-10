const Sauce = require("../models/sauce");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const sauce = require("../models/sauce");
const fs = require("fs");

exports.getAll = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOne = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.createOne = (req, res, next) => {
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
      res.status(201).json({ message: "Sauce enregistrée !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateOne = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (req.file) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {});
      }

      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Sauce modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteOne = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.setLike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const like = req.body.like;
      const userId = req.body.userId;
      // like sauce
      if (
        like == 1 &&
        !sauce.usersLiked.includes(userId) &&
        !sauce.usersDisliked.includes(userId)
      ) {
        sauce.likes++;
        sauce.usersLiked.push(userId);
        sauce
          .save()
          .then(() => res.status(200).json({ message: "Sauce likée !" }))
          .catch((error) => res.status(400).json({ error }));
      }
      // dislike sauce
      else if (
        like == -1 &&
        !sauce.usersDisliked.includes(userId) &&
        !sauce.usersLiked.includes(userId)
      ) {
        sauce.dislikes++;
        sauce.usersDisliked.push(userId);
        sauce
          .save()
          .then(() => res.status(200).json({ message: "Sauce dislikée !" }))
          .catch((error) => res.status(400).json({ error }));
      }
      // unlike or undislike sauce
      else if (like == 0) {
        if (sauce.usersDisliked.includes(userId)) {
          const index = sauce.usersDisliked.indexOf(userId);
          if (index != -1) {
            sauce.dislikes--;
            sauce.usersDisliked.splice(index, 1);
            sauce
              .save()
              .then(() =>
                res.status(200).json({ message: "Sauce undislikée !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        }

        if (sauce.usersLiked.includes(userId)) {
          const index = sauce.usersLiked.indexOf(userId);
          if (index != -1) {
            sauce.likes--;
            sauce.usersLiked.splice(index, 1);
            sauce
              .save()
              .then(() => res.status(200).json({ message: "Sauce unlikée !" }))
              .catch((error) => res.status(400).json({ error }));
          }
        }
      } else {
        res.status(400).json({ message: "Impossible d'effectuer l'action !" });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
