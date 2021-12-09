const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauce");

router.get("/", auth, multer, sauceCtrl.getAll);
router.get("/:id", auth, multer, sauceCtrl.getOne);
router.post("/", auth, multer, sauceCtrl.createOne);
router.put("/:id", auth, multer, sauceCtrl.updateOne);
router.delete("/:id", auth, multer, sauceCtrl.deleteOne);
router.post("/:id/like", auth, multer, sauceCtrl.setLike);

module.exports = router;
