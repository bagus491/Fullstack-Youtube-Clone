const mongoose = require('mongoose');


//schema
const ProfileSchema = new mongoose.Schema({
    username: String,
    PrName: String,
    Subs: String,
    Desc: String,
    ImgName: String,
    ImgFile: Buffer,
    ImgType: String,
})



const profiles = mongoose.model('profiles', ProfileSchema)



module.exports = profiles