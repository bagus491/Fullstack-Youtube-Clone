const express = require('express')
const app = express()
//auth
const Auth = require('../Auth/Auth')

//users Controller 
const {HomeWeb} = require('../Controllers/UserController')

//verify
const {CheckToken} = require('../Utils/Verify')

//GET == PAGES
//HomeWeb
app.get('/',HomeWeb)
//LoginPages
app.get('/login',CheckToken)


//dasbord page
app.get('/dasbord',CheckToken)


//dasbord-Uplaod pages
app.get('/dasbord/upload',CheckToken)


//dasbord-profile pages
app.get('/dasbord/profile',CheckToken)


//dasbord-setting pages
app.get('/dasbord/setting',CheckToken)


//AuthLogin
app.use(Auth)

module.exports = app