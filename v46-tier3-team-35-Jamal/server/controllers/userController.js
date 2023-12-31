const User = require("../models/user");

// create user
const createUser = async (req, res) => {
  console.log('[From POST handler]', req.body)
  try {
    const user = await User.create(req.body);
    console.log(user);
  } catch (error) {
    res.status(400).json(error)
    console.log(error);
  }
}

// get user by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).exec();
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

// update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error)
    res.status(500).send("Server Error");
  }
}

// delete user
const deleteUser = async (req, res) => {
  console.log(req.params.userId);
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

module.exports = {
  createUser, getUserById, updateUser, deleteUser
};
