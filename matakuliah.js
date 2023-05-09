const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  subCode: String,
  nama: String,
  ruangan: String,
  jam: String,
});

const matakuliah = mongoose.model("matakuliah", userSchema);

module.exports = matakuliah;
