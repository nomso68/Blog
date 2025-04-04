const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", UserSchema);
module.exports = Users;
