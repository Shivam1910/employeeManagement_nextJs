const Mongoose = require('mongoose')
require('./Connect')

const Schema = new Mongoose.Schema({
    PName: String,
    PPrice: String
})

const Model = Mongoose.model('products', Schema)
module.exports = Model

