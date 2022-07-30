const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const getByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ departamento: req.params.category });

  if (products) {
    res.json(products);
  } else {
    res.status(404).json({ message: "Products not Found" });
  }
});

module.exports = { getProducts, getByCategory };
