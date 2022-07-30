const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({ username, password });

  if (user) {
    res.status(200).json({ _id: user.id, username: user.username });
  } else {
    res.status(400);
    throw new Error("Error ocurred!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.isCorrectPassword(password))) {
    res.json({ _id: user.id, username: user.username });
  }  else {
    res.status(400);
    throw new Error("Invalid email or Password!");
  }
});

module.exports = { registerUser, authUser };
