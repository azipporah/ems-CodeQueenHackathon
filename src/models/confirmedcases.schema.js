const mongoose = require ('mongoose')
const Schema = mongoose.Schema; //creating a schema object

const patientSchema = new Schema({
    patientName: {
        type:String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    district: {
        type:String,
        required: true
    },
    dateOfEntry: {
        type:Date,
        required: true
    },
    patientPhoneNumber: {
        type:Number,
        required: true
    },
    nextOfKin: {
        type:String,
        required: true
    },
    nextOfKinPhoneNumber: {
        type:Number,
        required: true
    },
    description: {
        type:String,
        required: true
    }
});

const patients = mongoose.model("Confirmed Cases", patientSchema);
module.exports = patients