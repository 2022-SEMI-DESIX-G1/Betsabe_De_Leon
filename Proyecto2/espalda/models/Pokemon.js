const { Schema, model } = require("mongoose");

const PokemonSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  encounters: [],
  sprites: [],
  evolesArray: [],
  encounterArray: [],
  abilities: [],
  date: {
    type: String
  }
});

PokemonSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Pokemon", PokemonSchema);
