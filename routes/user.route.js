const express = require("express");
const {
  addNewUserController,
  fetchExistingUserController,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", addNewUserController);

router.post("/login", fetchExistingUserController);

module.exports = router;
