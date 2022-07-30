const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true},
    precio: { type: mongoose.Decimal128, required: true },
    stock: { type: Number, required: true },
    img: { type: String, required: true },
    codigo: { type: Number, required: true },
    departamento: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
