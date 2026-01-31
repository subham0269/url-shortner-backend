const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
    console.log(`Logged at Time: ${Date.now()}`)
});

module.exports = router;
