const express = require('express')
const app = express()
//auth
const Auth = require('../Auth/Auth')

//users Controller 
const {HomeWeb} = require('../Controllers/UserController')



//Get
//HomeWeb
app.get('/',HomeWeb)










//AuthLogin
app.use(Auth)

module.exports = app