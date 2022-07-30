const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const express = require("express");
const bcrypt = require("bcrypt");
const rout = require("./routes/router");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const User = require("./controller/user");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();
// connect to DB
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Users
app.use("/api/users", userRoutes);
// Products
app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Server instance
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} ...`);
});

module.exports = app;
