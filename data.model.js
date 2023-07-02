const mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  one: { type: Number, required: true },
  two: { type: Number, required: true },
});
const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
