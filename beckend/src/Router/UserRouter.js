const express = require('express')
const app = express()

//users Controller 
const {HomeWeb} = require('../Controllers/UserController')



//Get
//HomeWeb
app.get('/',HomeWeb)












module.exports = app