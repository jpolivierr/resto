const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const tokenAuth = require("../middleware/tokenAuth")
// const config = require('config')
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const saltRounds = 10
const UserModel = require("../Database/models/userModel")
const tokenSecret = 'f9c4c877a8e227f8db1d0990d68a68d60244a660ee42c9c69e34badaf7f93181d49b680bfbc85b625ee095e2ef3609502847a23668a83a805d09131737305139'

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 5 characters or more").isLength({
      min: 5,
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      const { name, email, password, password2 } = req.body
      // cheks for any errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      // make sure email doesnt exist in the database
      let user = await UserModel.findOne({ email })
      if (user) {
        return res
          .status(400)
          .json({ msg: "This email is already registered." })
      }
      // makes sure password matches
      if (password !== password2) {
        return res.status(400).json({ msg: "Password do not match" })
      }
      //Encrypt the password and store to database
      await bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newuser = UserModel({
          name,
          email,
          password: hash,
          favorite_restaurant: [],
        })
        if (err) throw err
        await newuser.save()
        // Return jsonwebtoken
        const userid = { id: newuser.id }
        const token = jwt.sign(userid, tokenSecret)
        const asset = newuser.favorite_restaurant
        res.status(200).json({ token, msg: "Registered successfuly",name: newuser.name, email: newuser.email, asset })
      })
    } catch (error) {
      return res.status(400)
    }
  }
)
router.get("/profile", tokenAuth, (req, res) => {
  res.send("yeah you got in")
})
module.exports = router
