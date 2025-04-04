const express = require("express");
const UserController = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("Welcome to our home route");
});

userRouter.get("/fetchAllUsers", UserController.fetchAllUsers);
userRouter.post("/signUp", UserController.createNewUser);
userRouter.post("/login", UserController.logUserIn);

module.exports = userRouter;
