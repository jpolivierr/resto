const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const { parse } = require("node-html-parser")
const cors = require("cors")
const Database = require("./Database/database")
const path = require("path")

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:5000",
  "https://https://murmuring-mesa-28934.herokuapp.com",
]
const corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin)
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error("Not allowed by CORS"))
    }
  },
}


Database()
// app.use(cors())
//Init Middleware
app.use(express.json({ extended: false }))
app.use(cors(corsOptions))

app.use("/register", require("./routes/register"))
app.use("/login", require("./routes//login"))
app.use("/profile", require("./routes/profile"))
app.use("/getRestaurant", require("./routes/getRestaurants"))

// console.log((process.env.NODE_ENV = "production"))
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")))
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`-----------------------server is running on PORT:${PORT}`)
})
