const express = require("express")
const axios = require("axios")
const {parse} = require('node-html-parser')
const router = express.Router()
const restoData = require('./restoData.json')
const zomatoKey = require("config").get('zomatoKey')

// get Data on load
router.get("/", async (req, res) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "user-key": zomatoKey,
    },
  }
  try {
    const response = await axios.get(
        `https://developers.zomato.com/api/v2.1/locations?query=miami`,
        config
      )
    const cityId = await response.data.location_suggestions[0].entity_id
    // fs.writeFile(path.join(__dirname, 'restoData.json'), JSON.stringify(restaurantResult.data), err =>{
    //   if(err) throw err
    //   console.log('File created......')
    // })
    res.json(restoData)
  } catch (error) {
    console.log(error)
    res.json({ ERROR: error })
  }
})

// get Data from filter
router.post("/", async (req, res) => {

  console.log(req.body)
  const {city, cuisine} = req.body
  const config = {
    headers: {
      "Content-Type": "application/json",
      "user-key": zomatoKey,
    },
  }
  try {
    const response = await axios.get(
        `https://developers.zomato.com/api/v2.1/locations?query=${city}`,
        config
      )
    const cityId = await response.data.location_suggestions[0].entity_id
    const restaurantResult = await axios.get(
      `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisine}`,
      config
    )
    console.log(restaurantResult.data)
    res.json(restaurantResult.data)
  } catch (error) {
    console.log(error)
    res.json({ ERROR: error })
  }
})

module.exports = router
