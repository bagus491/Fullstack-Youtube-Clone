const express = require('express')
const app = express()
//auth
const Auth = require('../Auth/Auth')

//users Controller 
const {HomeWeb, SearchVideo} = require('../Controllers/UserController')

//profile
const {doAddProfile,ProfileGet,doDeleteProfile,doUpdateProfile,doSubs,CheckSubs,doUnSubs,CheckProfile} = require('../Controllers/ProfileController')

//videos
const {doAddVideo,getVideos,getVideoUpload,watchVideo,doDeleteVideo, getVideoSetting} = require('../Controllers/VideoController')


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
app.get('/profile/:PrName',ProfileGet)
//addprofile
//error selanjutnya (2)
app.post('/dasbord/profile',Upload.single('Profile'),CheckPrName,doAddProfile)
//update
app.put('/dasbord/profile',CheckPrName,doUpdateProfile)
//deleteProfile
app.delete('/dasbord/profile',doDeleteProfile)
// checkprofile
app.get('/dasbord/checkprofile',CheckProfile)

//videos
app.get('/videos',getVideos)
//videosDasbord
app.get('/dasbord/videos/:PrName',getVideoUpload)
//post
app.post('/dasbord/upload',Upload.fields([{name: 'Video'},{name:'Poster'}]),doAddVideo)
//settingvideo
app.get('/dasbord/setting/videos',getVideoSetting)
//watch
//changes
app.get('/watch/:id',watchVideo)
//delete video
app.delete('/dasbord/video/:id',doDeleteVideo)
//search
app.get('/search',SearchVideo)


//checksubs
app.get('/checksub/:PrName',CheckSubs)

//addsubs
app.get('/sub/:PrName',doSubs)

//unsub
app.get('/unsub/:PrName',doUnSubs)

//logout
app.get('/logout',(req,res) => {
    res.clearCookie('token')
    res.status(203).json({msg : 'Success'})
})

//AuthLogin
app.use(Auth)

module.exports = app