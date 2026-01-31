const express = require("express");
const userRouter = require("./routes/user.route");

const router = express.Router();

router.get("/test", async (req, res) => {
  await new Promise((res) => setTimeout(res, 2000));
  return res.status(200).json({ message: "Test message" });
});

router.use("/auth", userRouter);

router.use("/urls", urlRouter);

module.exports.apiRouter = router;
