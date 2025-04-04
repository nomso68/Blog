const express = require("express");
const PostController = require("../controllers/post-controller");

const postRouter = express.Router();

postRouter.get("/", PostController.fetchAllPosts);
postRouter.get("/fetchPostById", PostController.fetchPostById);
postRouter.delete("/:id", PostController.deletePost);
postRouter.post("/", PostController.createPost);
postRouter.put("/", PostController.updatePost);

module.exports = postRouter;
