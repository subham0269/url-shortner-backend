const express = require("express");
const {
  addNewUserController,
  fetchExistingUserController,
  verifyUserController,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", addNewUserController);

router.post("/login", fetchExistingUserController);

router.get("/verify", verifyUserController);

module.exports = router;
