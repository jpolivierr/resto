const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  // Get token from header
  const token = req.headers["authorization"]
  // Check if there is a token
  if (!token) {
    return res.status(401).json({ msg: "No Token Present. Access Denied" })
  }
  // Verify token
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err)
        return res.status(403).json({ msg: "Invalid Token. Access Denied" })
      req.user = user
      next()
    })
  } catch (error) {}
}

module.exports = auth
