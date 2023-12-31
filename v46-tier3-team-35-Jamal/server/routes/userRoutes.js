const express = require("express");
const router = express.Router();
const { createUser, getUserById, updateUser, deleteUser } = require("../controllers/userController");

// create a new user
router.post("/create", createUser)

// get user by id
router.get("/:userId", getUserById)

// update user
router.put("/:userId/edit", updateUser)

// delete user
router.delete("/:userId/delete", deleteUser)

module.exports = router;
