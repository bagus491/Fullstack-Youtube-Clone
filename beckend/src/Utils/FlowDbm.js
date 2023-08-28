//profiles models
const Profile = require('../Models/Profiles')

//model Subscrice
const DataSubs = require('../Models/DataSubs')

//addProfile
const addProfile = (username,PrName,Subs,Desc,file) => {
    return new Profile({
        username,
        PrName,
        Subs,
        Desc,
        ImgName: file.filename,
        ImgFile: file.buffer,
        ImgType: file.mimetype
    })
}


//getOneProfile
const getProfile = async (PrName) => {
    return await Profile.findOne({PrName})
}


//getOneProfilebyname
const getOneProfilebyname = async (username) => {
    return await Profile.findOne({username})
}

//deleteProfile
const deleteProfile = async (username) => {
    return await Profile.deleteOne({username})
}

//updateProfile
const updateProfile = async(_id,username,PrName,Subs,Desc) => {
    return await Profile.updateOne(
        {
            _id:id
        },
        {
            $set: {
                username,
                PrName,
                Subs,
                Desc,
            }
        }
    )
}

//sub
const updateSub = async(PrName,Subs) => {
    return await Profile.updateOne(
        {
            PrName : PrName
        },{
            $set: {
                Subs,
            }
        }
    )
}


// addsubscribe
const addSubs = async(Subscribe,Subscriber) => {
    return new DataSubs({
        Subscribe,
        Subscriber
    })
}

//findOne
const getSubs = async() => {
    return await DataSubs.find()
}

//delete
const delSubs = async(Subscriber) => {
    return await DataSubs.deleteOne({Subscriber})
}


//videos
//videos model
const Videos = require('../Models/Videos')



//add video

const addVideo = (username,Title,Views,Date,Desc,Vd,Img) => {
    return new Videos({
        username,
        Title,
        Views,
        Date,
        Desc,
        VdName: Vd.filename,
        VdFile: Vd.buffer,
        VdType: Vd.mimetype,
        ImgName: Img.filename,
        ImgFile: Img.buffer,
        ImgType: Img.mimetype
    })
}

//GETaLL VIDEOS

const VideosData = async () =>{
    return await Videos.find()
} 

//getOneByNameiD
const VideosById = async(id) => {
    return await Videos.findOne({_id: id})
}

//deleteVideo
const VideosDelete = async(id) => {
    return await Videos.deleteOne({_id:id})
}

//updateViews
const VideoUpdateView = async(id,Views) => {
    return await Videos.updateOne(
        {
            _id: id
        },
        {
            $set: {
                Views
            }
        }
    )
}

module.exports = {addProfile,getProfile,deleteProfile,updateProfile,updateSub,getOneProfilebyname,addSubs,getSubs,delSubs,
addVideo,VideosData,VideosById,VideosDelete,VideoUpdateView}