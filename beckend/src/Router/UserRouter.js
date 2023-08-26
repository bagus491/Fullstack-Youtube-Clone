const express = require('express')
const app = express()
//auth
const Auth = require('../Auth/Auth')

//users Controller 
const {HomeWeb} = require('../Controllers/UserController')

//profile
const {doAddProfile,ProfileGet,doDeleteProfile,doUpdateProfile,doSubs,CheckSubs,doUnSubs} = require('../Controllers/ProfileController')

//verify
const {CheckToken,CheckPrName} = require('../Utils/Verify')

//multer
const multer = require('multer')

const storage = multer.memoryStorage()

//uplaods
const Upload = multer({storage})

//GET == PAGES
//HomeWeb
app.get('/',HomeWeb)
//LoginPages
app.get('/login',CheckToken)


//dasbord page
app.get('/dasbord/auth',CheckToken)

//profile-flow
app.get('/dasbord/profile/:PrName',ProfileGet)
//addprofile
app.post('/dasbord/profile',CheckPrName,Upload.single('Profile'),doAddProfile)
//update
app.put('/dasbord/profile',CheckPrName,doUpdateProfile)
//deleteProfile
app.delete('/dasbord/profile',doDeleteProfile)


//checksubs
app.get('/dasbord/checksub/:PrName',CheckSubs)

//addsubs
app.get('/dasbord/sub/:PrName',doSubs)

//unsub
app.get('/dasbord/unsub/:PrName',doUnSubs)

//logout
app.get('/logout',(req,res) => {
    res.clearCookie('token')
    res.status(203).json({msg : 'Success'})
})

//AuthLogin
app.use(Auth)

module.exports = app