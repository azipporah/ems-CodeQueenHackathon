const mongoose = require ('mongoose')
const schema = mongoose.Schema; //creating a schema object

const caseReportSchema = new schema({
    personName: {
        type:String,
        required: true
    },
    ageRange: {
        type:String,
        required: true
    },
    district: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    phoneNumber: {
        type:Number,
        required: true
    },
    dateOfReport: {
        type:Date,
        required: true
    }
})

const reportedCases = mongoose.model("Reported Cases", caseReportSchema)
module.exports = reportedCases