const { Router } = require("express");
const { pokemonsGet } = require("../../controllers/pokemons.controllers");

const router = Router();

router.get("/", pokemonsGet);

module.exports = router;
