const mongoose = require ('mongoose')
const schema = mongoose.Schema; //creating a schema object

const caseReportSchema = new schema({
    personName: {
        type:String,
        required: true
    },
    age: {
        type:String,
        required: true
    },
    personContact: {
        type:Number,
        required: true
    },
    district: {
        type:String,
        required: true
    }, 
    reporterContact: {
        type:Number,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    dateOfReport: {
        type:Date,
        required: true
    }
})

const reportedCases = mongoose.model("Reported Cases", caseReportSchema)
module.exports = reportedCases