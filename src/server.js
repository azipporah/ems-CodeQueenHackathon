const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();
const expressLayouts = require('express-ejs-layouts')
const path = require('path')



//linking the .env file
require('dotenv').config();
dotenv.config({path:__dirname+'/.env'});

//imports
const router = require('./routes/signup.post') //importing the routes file
const homeRoute = require('./routes/home.routes')

//getting port number from .env file
const port = process.env.PORT || 8000;

// MIDDLEWARE
//Merging front-end to back-end
app.use(homeRoute.routes)
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json()) // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// testing the server
app.get('/', (req, res) => {
    res.send("On Home!!")
})

// connecting to the database
mongoose.connect( process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log('Connected to db')
    // initial();
}).catch(err => {
    console.error("Connection error", err)
    process.exit()
})

// listening to the port
app.listen(port, (req, res) => {
    console.log(`Server started at port: ${port}`);
});