const express = require("express");
const { getProducts, getByCategory } = require("../controller/productControllers");
const router = express.Router();

router.route("/").get(getProducts);
router.route("/:category").get(getByCategory);

module.exports = router;