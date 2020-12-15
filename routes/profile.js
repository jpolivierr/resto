const express = require("express")
const router = express.Router()
const tokenAuth = require("../middleware/tokenAuth")
const profileModel = require("../Database/models/profileModel")
const User = require("../Database/models/userModel")
const jwt = require("jsonwebtoken")

// add favorite restaurants
router.post("/favorite", tokenAuth, async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ _id: req.user })
    // console.log(user)
    // const data = JSON.stringify({ names: "ell" })
    const data = [JSON.stringify(req.body.fav_res)]
    user = await User.findByIdAndUpdate(
      { _id: req.user },
      { favorite_restaurant: data },
      { new: true }
    )
    res.json(user)
  } catch (err) {
    console.error(err.message)
  }
})

// update Profile
router.post("/update", tokenAuth, async (req, res , next) => {
  console.log(req.user)
  try {
    const user = await User.findOne({ _id: req.user })
    user =  User.findByIdAndUpdate(
      { _id: req.user },
      { $set: { name: req.body.name, email: req.body.email } }
    )
    res.json({ msg: "updated" })
  } catch (error) {
    console.error(error.message)
    res.json({ msg: error.message })
  }
})
// Delete Profile
router.post("/delete", tokenAuth, async (req, res) => {
  console.log(req.user)
  try {
    const user = await User.findOne({ _id: req.user })
    user = await User.findByIdAndDelete(req.user, (err, docs) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Deleted :", docs)
      }
    })
    await res.json({ msg: "updated" })
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = router
