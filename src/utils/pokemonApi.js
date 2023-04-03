const axios = require("axios");
const Pokemon = require("../models/pokemon");

const pokemonsGetApi = async (req, res) => {
  try {
    const dataPoke = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=150"
    );
    const pokePromises = dataPoke.data.results.map((poke) =>
      axios.get(poke.url)
    );
    const pokemonsResults = await axios.all(pokePromises);
    const pokemons = pokemonsResults.map((poke) => ({
      poke_number: poke.data.id,
      name: poke.data.name,
      hp: poke.data.base_experience,
      height: poke.data.height,
      weight: poke.data.weight,
      img: poke.data.sprites.other.home.front_default,
      img_2: poke.data.sprites.other.dream_world.front_default,
      img_3: poke.data.sprites.front_default,
      img_4: poke.data.sprites.other["official-artwork"].front_default,
      types: poke.data.types.map((t) => t.type.name),
      abilities: poke.data.abilities.map((a) => a.ability.name),
    }));
    const resultPromises = pokemons.map(async (pokemon) => {
      const filter = { name: pokemon.name };
      const update = { $set: pokemon };
      const options = { upsert: true, new: true };
      return Pokemon.updateOne(filter, update, options);
    });

    const dataInDb = await Promise.all(resultPromises);
    return dataInDb;
  } catch (error) {
    console.log(error);
    throw new Error("Error retrieving data from external API");
  }
};

module.exports = { pokemonsGetApi };
