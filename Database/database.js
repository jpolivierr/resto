const mongoose = require("mongoose")
const configdb = require("config").get('mongoURI')
require('dotenv').config()

const connectDataBase = async () => {
  try {
    await mongoose.connect(configdb,{
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
