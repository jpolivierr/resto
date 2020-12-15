const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const tokenAuth = require("../middleware/tokenAuth")
const { check, validationResult } = require("express-validator")
const UserModel = require("../Database/models/userModel")
const bcrypt = require("bcryptjs")
const tokenSecret = 'f9c4c877a8e227f8db1d0990d68a68d60244a660ee42c9c69e34badaf7f93181d49b680bfbc85b625ee095e2ef3609502847a23668a83a805d09131737305139'


// user login
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
    check("password", "Please include your password").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // Check to see if user exist
    const { email, password } = req.body
    try {
      let user = await UserModel.findOne({ email })
      if (!user) {
        res.status(400).json({ msg: "Oops! Invalid Credentials. Please try again" })
      }
      // compare passwords
      const itMatch = await bcrypt.compare(password, user.password)
      if (!itMatch) {
        return res.status(400).json({ msg: "Oops! Invalid Credentials. Please try again" })
      }
      // Return jsonwebtoken
      const asset = user.favorite_restaurant
    //   console.log(JSON.parse(asset))
      const token = jwt.sign(user.id, tokenSecret)
  
      res.status(200).json({ token, msg: "Registered successfuly", asset, name: user.name, email: user.email  })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server error")
    }
  }
)

module.exports = router
