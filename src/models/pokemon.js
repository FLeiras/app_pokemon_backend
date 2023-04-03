const { Schema, model } = require("mongoose");

const pokemonSchema = new Schema({
  poke_number: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  hp: {
    type: Number,
    require: false,
  },
  height: {
    type: Number,
    require: false,
  },
  weight: {
    type: Number,
    require: false,
  },
  img: {
    type: String,
    require: false,
  },
  img_2: {
    type: String,
    require: false,
  },
  img_3: {
    type: String,
    require: false,
  },
  img_4: {
    type: String,
    require: false,
  },
  types: {
    type: Array,
    default: [],
    require: false,
  },
  abilities: {
    type: Array,
    default: [],
    require: false,
  },
  species: {
    type: String,
    require: false,
  },
});

pokemonSchema.index({ name: 1 }, { unique: true });

module.exports = model("Pokemon", pokemonSchema);
