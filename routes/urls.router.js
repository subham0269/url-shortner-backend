const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const urlsController = require("../controllers/urls.controller");

const router = express.Router();

router.use(authMiddleware.checkValidUser);

router.post('/create', urlsController.create);

module.exports = router;
