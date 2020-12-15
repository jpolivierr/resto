const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorite_restaurant: {
    type: [String],
  },
})

module.exports = mongoose.model("user", UserModel)
