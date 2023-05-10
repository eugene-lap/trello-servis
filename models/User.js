const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, require: true},
    password: {type: String, required: true},
})

module.exports = model('User', User)