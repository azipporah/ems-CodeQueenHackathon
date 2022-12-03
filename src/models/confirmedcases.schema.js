const mongoose = require ('mongoose')
const Schema = mongoose.Schema; //creating a schema object

const patientSchema = new Schema({
    name: {
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
    status: {
        type:String,
        required: true
    }
});

const patients = mongoose.model("Confirmed Cases", patientSchema);
module.exports = patients