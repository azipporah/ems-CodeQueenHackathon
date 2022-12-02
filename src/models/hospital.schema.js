const mongoose = require("mongoose")
const schema = mongoose.Schema

const hospitalSchema = new schema({
    hospital_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    status: {
       type: String,
       enum: ['full','vacant'],
       required: true
    },
    password:{
        type: String,
        required: true
    }

})

const hospitals = mongoose.model("Hospitals", hospitalSchema)
module.exports = hospitals