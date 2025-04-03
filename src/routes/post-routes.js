const mongoose = require("mongoose");
const express = require("express");
const PostController = require("../controllers/post-controller");
const postRouter = express.Router();

postRouter.get("/", PostController.fetchAllPosts);

postRouter.post("/", PostController.createPost);
postRouter.get("/fetchAllPosts", PostController.fetchAllPosts);

module.exports = postRouter;
