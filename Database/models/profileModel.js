const mongoose = require('mongoose')

const profileModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    favorite_restaurant: {
        type: [{String}]
    }
})

module.exports = mongoose.model('profile', profileModel)