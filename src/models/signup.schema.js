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
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Users = mongoose.model("Users", signupSchema)
module.exports = Users