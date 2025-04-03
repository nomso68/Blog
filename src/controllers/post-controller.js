const Posts = require("../models/posts");

// CREATE POST
exports.createPost = (req, res) => {
  try {
    let newPost = new Posts({
      title: req.body.title,
      category: req.body.category,
      deleted: false,
    });

    newPost
      .save()
      .then((data) => res.send("Post added successfully"))
      .catch((err) => {
        console.log(err);
        res.send("An error has occurred again");
      });
  } catch (err) {
    console.log(err);
    res.send("An error has occurred");
  }
};

// GET ALL POSTS
exports.fetchAllPosts = async (req, res) => {
  try {
    let allPosts = await Posts.find(
      { deleted: false || undefined },
      "title category"
    );
    res.send(allPosts);
  } catch (err) {
    console.log(err);
    res.send("Don't expect any posts because an error has occurred");
  }
};

exports.updatePost = async (req, res) => {
  try {
    let allPosts = await Posts.findByIdAndUpdate(req.body.id);
  } catch (err) {
    console.log(err);
    res.send("An error has occurred");
  }
};

exports.deletePost = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.send("An error has occurred");
  }
};
