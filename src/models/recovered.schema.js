const mongoose = require ("mongoose")
const schema = mongoose.Schema

const recoveredSchema = new schema({
    patient_name:{
        type:String,
        required:true
    },
    hospital_name:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date_of_recovery:{
        type:Date,
        required:true
    }
})

const recovered = mongoose.model("Recovered cases", recoveredSchema)
module.exports = recovered