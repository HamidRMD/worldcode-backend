const mongoose = require("mongoose");
const { Schema } = mongoose;

const signup = new Schema(
  {
    vorname: String,
    nachname: String,
    email: String,
    password: String

  }


);

module.exports = mongoose.model("Signup", signup);