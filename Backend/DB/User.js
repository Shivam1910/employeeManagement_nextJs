const Mongoose = require('mongoose')
require('./Connect')

const Schema = new Mongoose.Schema({
    Name: String,

    Email: String,
    Password: String
})

const Model = Mongoose.model('users', Schema)
module.exports = Model

