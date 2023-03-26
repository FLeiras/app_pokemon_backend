const { response } = require("express");
const axios = require("axios");

const pokemonsGet = async (req, res) => {
  try {
    const dataPoke = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150"
    );
    const pokePromises = dataPoke.data.results.map((poke) =>
      axios.get(poke.url)
    );
    const pokemonsResults = await axios.all(pokePromises);
    const pokemons = pokemonsResults.map((poke) => ({
      id: poke.data.id,
      name: poke.data.name,
      hp: poke.data.base_experience,
      height: poke.data.height,
      weight: poke.data.weight,
      img: poke.data.sprites.other.home.front_default,
      types: poke.data.types.map((t) => t.type.name),
    }));
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ message: "not found", detail: error });
  }
};

module.exports = {
  pokemonsGet,
};
