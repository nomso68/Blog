const Posts = require("../models/posts");
const mongoose = require("mongoose");
// CREATE POST
exports.createPost = async (req, res) => {
  try {
    let newPost = new Posts({
      title: req.body.title,
      category: req.body.category,
      body: req.body.body,
      deleted: false,
      author: req.body.author,
    });

    await newPost.save();
    res.send("Post added successfully");
  } catch (err) {
    console.log(err);
    res.send("An error has occurred");
  }
};

// GET ALL POSTS
exports.fetchAllPosts = async (req, res) => {
  try {
    let allPosts = await Posts.find({ deleted: { $in: [false, null] } });
    res.send(allPosts);
  } catch (err) {
    console.log(err);
    res.send("Don't expect any posts because an error has occurred");
  }
};

// GET POST BY ID
exports.fetchPostById = async (req, res) => {
  try {
    let isValid = mongoose.Types.ObjectId.isValid(req.body.id);
    if (!isValid) {
      return res.status(400).send("Invalid ID format");
    } else {
      let singlePost = await Posts.findOne(
        {
          _id: req.body.id,
          deleted: { $in: [false, null] },
        },
        "title category"
      );
      //   if (singlePost.deleted || !singlePost) {
      //     return res.status(404).send("Post not found");
      //   } else {
      //     let post = await Posts.findById(req.body.id, "title category");
      //     res.send(post);
      //   }
      res.send(singlePost);
    }
  } catch (err) {
    console.log(err);
    res.send("An error has occurred");
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
    let isValid = mongoose.Types.ObjectId.isValid(req.body.id);
    if (!isValid) {
      return res.status(400).send("Invalid ID format");
    } else {
      let updatedPosts = await Posts.findOneAndUpdate(
        { _id: req.body.id, deleted: { $in: [false, null] } },
        {
          title: req.body.title,
          category: req.body.category,
        },
        { new: true, fields: "title category" }
      );
      res.send(updatedPosts);
    }
  } catch (err) {
    console.log(err);
    res.send("An error has occurred");
  }
};

// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    let isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValid) {
      return res.status(400).send("Invalid ID format");
    } else {
      let deletedPost = await Posts.findOneAndUpdate(
        { _id: req.params.id, deleted: { $in: [false, null] } },
        { deleted: true },
        { new: true, fields: "title category" }
      );
      res.send("Post deleted successfully");
    }
  } catch (err) {
    console.log(err);
    res.send("An error has occurred");
  }
};

// FETCH POSTS BY USERS
exports.fetchPostByUsers = async (req, res) => {
  try {
    let allPOstsByUser = await Posts.find(
      { deleted: { $in: [false, null] } },
      "title category body author"
    );
  } catch (err) {
    res.send("err");
  }
};

exports.fetchAllPostsWithAuthor = async (req, res) => {
  try {
    let allPosts = await Posts.find({
      // deleted: { $in: [false, null] }
    }).populate("author");
    res.send(allPosts);
  } catch (err) {
    res.send("err");
  }
};
