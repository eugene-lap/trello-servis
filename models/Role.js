const {Schema, model} = require('mongoose')

const Role = new Schema({
    username: {type: String, unique: true, default: "USER"},
})

module.exports = model('Role', Role)