const express = require("express");
const userRouter = express.Router();

const {
  createUser,
  getUsersByRegex,
  getUserByUserName,
  connectionRequest,
  removeConnection,
  updateUser,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/userControllers");

userRouter.post("/create", createUser);
userRouter.get("/search/:query", getUsersByRegex);
userRouter.get("/get/:userName", getUserByUserName);
userRouter.post("/connection/request", connectionRequest);
userRouter.post("/connection/remove", removeConnection);
userRouter.patch("/update/:userName", updateUser);
userRouter.post("/:userName/achievement/create", createAchievement);
userRouter.patch("/achievement/update", updateAchievement);
userRouter.delete("/achievement/delete", deleteAchievement);

module.exports = userRouter;