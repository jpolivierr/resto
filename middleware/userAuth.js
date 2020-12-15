const { check, validationResult } = require("express-validator")

const userAuth = async (req, res, next) => {
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
    next()
  
}

module.exports = userAuth
