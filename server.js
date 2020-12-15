const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const Database = require("./Database/database")
const path = require('path')

// ** MIDDLEWARE ** //
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://shrouded-journey-38552.heroku.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))


Database()
app.use(cors())
//Init Middleware
app.use(express.json({extended: false}))

// app.get('/a',(req, res)=>{res.json({msg: 'hello there'})})
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes//login'))
app.use('/profile', require('./routes/profile'))
app.use('/getRestaurant', require('./routes/getRestaurants'))

//Serve client react instead of backend 
// Add the follwing code to your server file on the backend 
// const path = require('path');
// if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  // app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`-----------------------server is running on PORT:${PORT}`)
})
