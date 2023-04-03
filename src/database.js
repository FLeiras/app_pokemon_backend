require("dotenv").config();
const mongoose = require("mongoose");
const { DB_USER, DB_PASSWORD, DB_LOCAL_HOST } = process.env;

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@mongoPoke:27017/pokeDb?authSource=admin`;
// const URI = `mongodb://${DB_LOCAL_HOST}/mongoPoke`;

mongoose
  .connect(URI)
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
