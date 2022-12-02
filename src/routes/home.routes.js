const express = require('express')
const router = express.Router()
const {homeview} = require('../controllers/home.controller')

router.get('/', homeview)

module.exports = {
    routes : router
}