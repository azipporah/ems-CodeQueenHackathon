const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();

//linking the .env file
require('dotenv').config();
dotenv.config({ path: __dirname + '/.env' });

//imports
const router = require('./routes/signup.post') //importing the routes file

//getting port number from .env file
const port = process.env.PORT || 8000;

// MIDDLEWARE
app.set("view engine", "ejs")
app.use(express.json()) // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connecting to front-end
app.use(express.static('views'))

// EJS GET ROUTES
app.get('/', (req, res) => {
    res.render("publicPage")
    // res.status(200).sendFile(__dirname + "register.ejs")
})

app.get('/register', (req, res) => {
    res.render("register")
    // res.status(200).sendFile(__dirname + "register.ejs")
})

app.get('/login', (req, res) => {
    res.render("login")
    // res.status(200).sendFile(__dirname + "register.ejs")
})

app.get('/userTable', (req, res) => {
    // res.status(200).sendFile(__dirname + "report.users.ejs")
    res.render("users")
})

app.get('/adminPage', (req, res) => {
    // res.status(200).sendFile(__dirname + "report.users.ejs")
    res.render("adminPage")
})

app.get('/hospitalPage', (req, res) => {
    // res.status(200).sendFile(__dirname + "report.users.ejs")
    res.render("hospitalPage")
})

app.get('/stat', (req, res) => {
    // res.status(200).sendFile(__dirname + "report.users.ejs")
    res.render("statistics")
})

app.get('/hospital', (req, res) => {
    // res.status(200).sendFile(__dirname + "report.users.ejs")
    res.render("createHospital")
})

app.get('/confirmedCases', (req, res) => {
    // res.status(200).sendFile(__dirname + "report.users.ejs")
    res.render("confirmedCases")
})

app.get('/reportedCases', (req, res) => {
    // res.status(200).sendFile(__dirname + "report.users.ejs")
    res.render("reportedCases")
})

// CONNECTING TO THE DATABASE
mongoose.connect(process.env.url, {
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