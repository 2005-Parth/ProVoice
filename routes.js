const express = require("express");
const router = express.Router();

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;