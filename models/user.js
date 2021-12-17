const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const emailValidation = (email) => {
  const emailRegex = /^[a-zA-Z0-9-\.]+@[a-zA-Z0-9-\.]+\.[a-zA-Z]{2,12}$/;
  return emailRegex.test(email);
};

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [emailValidation, `Votre email n'est pas valide !`],
  },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
