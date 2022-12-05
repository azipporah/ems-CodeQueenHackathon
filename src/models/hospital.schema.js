const mongoose = require("mongoose")
const schema = mongoose.Schema

const hospitalSchema = new schema({
    hospitalName: {
        type: String,
        required: true
    },
    hospitalEmail: {
        type: String,
        required: true
    },
    hospitalDistrict: {
        type: String,
        required: true
    },
    hospitalCapacity: {
        type: String,
        required: true
    },
    hospitalStatus: {
       type: String,
       required: true
    },
    hospitalPassword:{
        type: String,
        required: true
    }

})

const hospitals = mongoose.model("Hospitals", hospitalSchema)
module.exports = hospitals