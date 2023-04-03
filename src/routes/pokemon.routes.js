const { Router } = require("express");
const {
  pokemonsGetDb,
  pokemonPost,
  pokemonPut,
  pokemonDelete,
  getOnePokemon,
  deleteAllPokemon,
} = require("../controllers/pokemons.controllers");

const router = Router();

router.get("/", pokemonsGetDb);
router.get("/:id", getOnePokemon);
router.post("/", pokemonPost);
router.put("/:id", pokemonPut);
router.delete("/all", deleteAllPokemon);
router.delete("/:id", pokemonDelete);

module.exports = router;
