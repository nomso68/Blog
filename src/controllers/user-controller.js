const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.fetchAllUsers = async (req, res) => {
  try {
    let allUsers = await Users.find(
      { deleted: { $in: [false, null] } },
      "firstName lastName phoneNumber emailAddress"
    );
    res.send(allUsers);
  } catch (err) {
    res.send("An error has occurred while fetching users");
  }
};

exports.createNewUser = async (req, res) => {
  let { firstName, lastName, phoneNumber, email, password } = req.body;
  try {
    let saltRounds = 10;
    // let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, saltRounds);

    let newUser = new Users({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hash,
      deleted: false,
    });
    await newUser.save();
    res.json({
      message: "User added successfully",
      data: newUser,
    });
  } catch (err) {
    res.send("An error has occurred");
  }
};

exports.logUserIn = async (req, res) => {
  try {
    let { email, password } = req.body;
    let singleUser = await Users.findOne(
      { email: req.body.email, deleted: { $in: [false, null] } },
      { __v: 0, deleted: 0 }
    );
    if (!singleUser) {
      return res.status(404).send("User not found");
    }
    let isEqual = await bcrypt.compare(password, singleUser.password);
    if (isEqual) {
      let token = jwt.sign({ id: singleUser._id }, "secret");
      res.json({
        userData: {
          firstName: singleUser.firstName,
          lastName: singleUser.lastName,
          phoneNumber: singleUser.phoneNumber,
          email: singleUser.email,
        },
        token,
      });
    } else {
      return res.status(401).send("User not found");
    }
  } catch (err) {
    res.send("We could not log you in");
  }
};

exports.fetchUserBlogPosts = async (req, res) => {
  try {
    let isValid = mongoose.Types.ObjectId.isValid(req.params.userId);
    if (isValid) {
      let userPosts = await Users.findOne({ _id: req.params.userId }).populate(
        "posts"
      );
      res.send(userPosts);
    } else {
      return res.status(400).send("Invalid ID format");
    }
  } catch (err) {
    res.send(err);
  }
};
