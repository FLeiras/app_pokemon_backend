const { pokemonsGetApi } = require("../utils/pokemonApi");
const Pokemon = require("../models/pokemon");

const pokemonsGetDb = async (req, res) => {
  try {
    await pokemonsGetApi();
    const pokemonData = await Pokemon.find();
    res.status(200).json(pokemonData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOnePokemon = async (req, res) => {
  try {
    const onePoke = await Pokemon.findById(req.params.id);
    res.status(200).json(onePoke);
  } catch (error) {
    res.status(500).json({ message: "Pokemon not found" });
  }
};

const pokemonPost = async (req, res) => {
  try {
    const { name, hp, height, weight, img, types } = req.body;
    const pokeCreated = new Pokemon({ name, hp, height, weight, img, types });
    await pokeCreated.save();
    console.log(pokeCreated);
    res.json({ status: "Pokemon saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unsaved Pokemon" });
  }
};

const pokemonPut = async (req, res) => {
  try {
    const { name, hp, height, weight, img, types } = req.body;
    const newPoke = { name, hp, height, weight, img, types };
    await Pokemon.findByIdAndUpdate(req.params.id, newPoke);
    res.status(200).json({ status: "Pokemon Updated" });
  } catch (error) {
    res.status(500).json({ message: "Fail to update" });
  }
};

const pokemonDelete = async (req, res) => {
  try {
    await Pokemon.findByIdAndRemove(req.params.id);
    res.status(200).json("Pokemon deleted");
  } catch (error) {
    res.status(500).json({ status: "Failed" });
  }
};

const deleteAllPokemon = async (req, res) => {
  try {
    const result = await Pokemon.deleteMany({});
    res.status(200).json(`Se eliminaron ${result.deletedCount} Pokemons`);
  } catch (error) {
    res.status(500).json({ message: "Error to delete" });
  }
};

module.exports = {
  pokemonsGetDb,
  pokemonPost,
  pokemonPut,
  pokemonDelete,
  getOnePokemon,
  deleteAllPokemon,
};
