const mongoose = require('mongoose');


//schema
const VideoSchema = new mongoose.Schema({
    username: String,
    Title: String,
    Views: String,
    Date: String,
    Desc: String,
    VdName: String,
    VdFile: Buffer,
    VdType: String,
    ImgName: String,
    ImgFile: Buffer,
    ImgType: String,
})



const videos = mongoose.model('videos', VideoSchema)



module.exports = videos