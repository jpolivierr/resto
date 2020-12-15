const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const tokenAuth = require("../middleware/tokenAuth")
const { check, validationResult } = require("express-validator")
const UserModel = require("../Database/models/userModel")
const bcrypt = require("bcryptjs")

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
      const token = jwt.sign(user.id, process.env.TOKEN_SECRET)
  
      res.status(200).json({ token, msg: "Registered successfuly", asset, name: user.name, email: user.email  })
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Server error")
    }
  }
)

module.exports = router
