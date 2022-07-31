const { response } = require("express");

const {
  getEvolution,
  apiPokemon,
  getEncounters,
} = require("../get/pokemon");
const {
  getEvolutions,
  getAbilities,
  getEncountersList,
} = require("../get/objects");
const Pokemon = require("../models/Pokemon");
const moment = require("moment");

const getPokemon = async (req, res = response) => {
  const timeDefault = 2;
  const { name } = req.params;
  const pokemon = await Pokemon.findOne({ name: name });

  if (pokemon) {
    const momentDate = moment();
    const dateOld = moment(pokemon.date);
    const timeDiferent = momentDate.diff(dateOld, "minutes");

    if (timeDefault - timeDiferent <= 0) {
      const newDate = moment().format();
      const pokemonUpdate = await Pokemon.findOneAndUpdate({ name: name },{ date: newDate },{ new: true });

      return res.json({infoPokemon: pokemonUpdate,isCached: true,});
    }

    return res.json({ infoPokemon: pokemon });
  }

  try {
    const response = await apiPokemon(name);
    const { data } = await getEvolution(response.species.url);
    const evolution = await getEvolution(data.evolution_chain.url);
    const encounters = await getEncounters(name);
    const encounterArray = getEncountersList(encounters.data);
    const evolesArray = getEvolutions(evolution);
    const abilities = getAbilities(response);
    const date = moment().format();

    const infoPokemon = {
      name,
      id: response.id,
      weight: response.weight,
      height: response.height,
      encounters: encounters.data,
      sprites: response.sprites,
      encounterArray: encounterArray,
      evolesArray,
      abilities,
      date: date,
    };

    const pokemonDB = new Pokemon(infoPokemon);
    pokemonDB.save();

    res.json({
      infoPokemon: pokemonDB,
      isCached: false,
    });
  } catch {
    ERROR[name] = JSON.stringify({ name, error: "Invalid pokemon." });
  }
};

module.exports = {
  getPokemon
};
