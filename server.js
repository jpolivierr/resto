const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const cors = require("cors")
const Database = require("./Database/database")
const path = require("path")

Database()
app.use(cors())
//Init Middleware
app.use(express.json({ extended: false }))


app.use("/register", require("./routes/register"))
app.use("/login", require("./routes//login"))
app.use("/profile", require("./routes/profile"))
app.use("/getRestaurant", require("./routes/getRestaurants"))

app.use(express.static(path.join(__dirname, "client/build")))


  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
  })

app.listen(PORT, () => {
  console.log(`-----------------------server is running on PORT:${PORT}`)
})
