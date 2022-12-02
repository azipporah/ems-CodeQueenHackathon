const mongoose = require ("mongoose")
const schema = mongoose.Schema

const deceasedSchema = new schema({
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
    date_of_death:{
        type:Date,
        required:true
    }
})

const deceased = mongoose.model("Deceased cases", deceasedSchema)
module.exports = deceased