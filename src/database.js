const mongoose = require("mongoose");

const URI = "mongodb://fede:password@mongoPoke:27017/pokeDb?authSource=admin";

mongoose
  .connect(URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
