const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  gender: {
    type: String,
  },

  phone: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  maritalStatus: {
    type: String,
  },

  profession: {
    type: String,
  },
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);