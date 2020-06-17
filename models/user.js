var mongoose = require("mongoose");
var { ObjectId } = mongoose.Schema.Types;

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [{ type: Object, ref: "User" }],
  following: [{ type: Object, ref: "User" }],
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
