const mongoose = require("mongoose")
const config = require("config")
require('dotenv').config()

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log("-----------------------Database Connected...")
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = connectDataBase
