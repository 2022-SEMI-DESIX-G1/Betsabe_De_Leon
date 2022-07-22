const mongoose = require("mongoose");

//Define a schema
const oilCollection = mongoose.model("Aceites y Mantecas", {});

const milkyCollection= mongoose.model("Lácteos", {});

const meetCollection= mongoose.model("Cárnicos", {});

const freezeCollection= mongoose.model("Congelados", {});

const bakeryCollection = mongoose.model("Panaderia", {});

const personalCareCollection = mongoose.model("Personal care", {});

const FruitsVegetablesCollection = mongoose.model("Frutas y Vegetables", {});

const sausagesCollection = mongoose.model("Embutidos", {});

const candiesCollection = mongoose.model("Golosinas y Snacks", {});

const petCollection = mongoose.model("Mascotas", {});

const pantryCollection = mongoose.model("Despensa", {});


// Compile model from schema
  module.exports = {oilCollection, milkyCollection};

