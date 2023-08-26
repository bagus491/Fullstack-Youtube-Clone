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
app.get('/dasbord/auth',CheckToken)





//logout
app.get('/logout',(req,res) => {
    res.clearCookie('token')
    res.status(203).json({msg : 'Success'})
})

//AuthLogin
app.use(Auth)

module.exports = app