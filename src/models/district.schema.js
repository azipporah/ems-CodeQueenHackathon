const mongoose = require('mongoose')
const schema = mongoose.Schema; //creating a schema object

const districtSchema = new schema({
    district_name: {
        type: String,
        required: true
    }
})

const districts = mongoose.model("Districts", districtSchema)
module.exports = districts