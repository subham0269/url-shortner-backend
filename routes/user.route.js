const express = require("express");
const {
  addNewUserController,
  //   getUsersController,
} = require("../controllers/user.controller");

const router = express.Router();

// POST /users
router.post("/", addNewUserController);

// GET /users
// router.get("/", getUsersController);

module.exports = router;
