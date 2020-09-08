const mongoose = require('mongoose')
const { model } = require('./AppData')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    fullName: String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    isActive: Boolean
})

module.exports = mongoose.model("User", userSchema)