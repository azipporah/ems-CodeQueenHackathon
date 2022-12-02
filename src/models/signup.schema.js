const mongoose = require('mongoose')
const schema = mongoose.Schema; //creating a schema object

const signupSchema = new schema({
    username: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user','admin','hospital'],
        required: true
    }
})

const Users = mongoose.model("Users", signupSchema)
module.exports = Users