//flowvideos
const {addVideo,VideosById,VideosData,VideosDelete,getOneProfilebyname,getProfile,VideoUpdateView} = require('../Utils/FlowDbm')
//users
const {UserOne} = require('../Utils/FlowDbq')

//jwt
const {jwt,secret} = require('../Utils/Verify')

//addvideos
const doAddVideo = async (req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async (err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //dataOk
            const decodedUser = decoded.username
            const dataOk = await UserOne(decodedUser)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //checkProfile
            const ProfileOk = await getOneProfilebyname(decodedUser)
            if(!ProfileOk){
                return res.status(203).json({msg : 'Profile Doesnt Exist'})
            }

            const {Title,Desc} = req.body
            
            //date
            const date = new Date()
            
            //views
            let Views = "0"

            //addviews
            const add = addVideo(decodedUser,Title,Views,date,Desc,req.files['Video'][0],req.files['Poster'][0])

            //saved
            const saved = await add.save()

            if(!saved) {
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.status(201).json({msg : 'Success add'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//ALLVIDEO
const getVideos = async(req,res) => {
    try{
        const Videos = await VideosData()
        if(!Videos){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        //map
        const mapVideos = await Promise.all(
            await Videos.map((e) => {
                const {_id,Title,Views,VdFile,VdType,ImgFile,ImgType} = e

                //decodedVIDEO
                const videDeco = VdFile.toString('base64');
                //path
                const videoPath = `data:${VdType};base64,${videDeco}`;

                //decodedPoster
                const ImgDeco = ImgFile.toString('base64');
                //path
                const ImgPath = `data:${ImgType};base64,${ImgDeco}`

                return {_id,Title,Views,videoPath,ImgPath}
            })
        )

        if(!mapVideos){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        res.status(200).json({msg : 'Success',data:mapVideos})
    }catch(error){
        res.status(500).json({msg: 'Internal Server Error'})
    }
}


//filtervideobyPrNAME
const getVideoUpload = async(req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const decodedUser = decoded.username
            //data
            const dataOk = await UserOne(decodedUser)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //checkProfile
            const profileOk = await getProfile(req.params.PrName)
            if(!profileOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //dataVideos
            const videos = await VideosData()

            //filter
            const FilterData = videos.filter((e) => e.username === decodedUser)
            if(!FilterData || FilterData.length < 0){
                return res.status(203).json({msg : 'Videos Doenst Exist'})
            }

            //map
            const dataMap = await Promise.all(
                await FilterData.map((e) => {
                    const {_id,Title,Views,VdFile,VdType,ImgFile,ImgType} = e

                    //decodedVIDEO
                    const videDeco = VdFile.toString('base64');
                    //path
                    const videoPath = `data:${VdType};base64,${videDeco}`;
    
                    //decodedPoster
                    const ImgDeco = ImgFile.toString('base64');
                    //path
                    const ImgPath = `data:${ImgType};base64,${ImgDeco}`
    
                    return {_id,Title,Views,videoPath,ImgPath}
                })
            )
            
            if(!dataMap){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.status(200).json({msg : 'Success', data:dataMap})
            
        })
    }catch(error){
        res.status(500).json({msg: 'Internal Server Error'})
    }
}

//watchVideo
const watchVideo = async(req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization
        if(token){
            jwt.verify(token,secret,async(err,decoded) => {
                if(err){
                    return res.status(401).json({msg : 'Not Authorization'})
                }

                //decoded
                const decodedUser = decoded.username
                //dataok
                const dataOk = await UserOne(decodedUser)
                if(!dataOk){
                    return res.status(401).json({msg : 'Not Authorization'})
                }

                //videOk
                const VideoOk = await VideosById(req.params.id)
                if(!VideoOk){
                    return res.status(401).json({msg : 'Not Authorization'})
                }

                //destucrion
                const {Title,Views,Date,Desc,VdFile,VdType} = VideoOk

                //decodedVideo
                const VideoData = VdFile.toString('base64')
                //videoPath
                const VideoPath = `data:${VdType};base64,${VideoData}`

                //checkuser
                if(VideoOk.username != decodedUser){
                    //getViews
                    //change to number
                    let View = parseInt(Views)

                    View += 1

                    //changetostring
                    let NewView = View.toString()

                    //update views
                    const updateView = await VideoUpdateView(req.params.id,NewView)
                    if(!updateView){
                        return res.status(401).json({msg : 'Not Authorization'})
                    }
                }

                //ForSideVideo
                const Videos = await VideoData()

                //filterVideos
                const FilterVideo = Videos.filter((e) => e.username != decodedUser)
                if(!FilterVideo || FilterVideo.length < 0){
                    return res.status(203).json({msg : 'Not Authorization'})
                }

                //mapFilter
                const FilterMap = await Promise.all(
                    await FilterVideo.map((e) => {
                       const {_id,username,Title,Views,ImgFile,ImgType} = e
    
                        //decodedImg
                        const ImgData = ImgFile.toString('base64')
                        //imgPath
                        const ImgPath = `data:${ImgType};base64,${ImgData}`

                        return {_id,username,Title,Views,ImgPath}
                    })
                )

                if(!FilterMap || FilterMap.length < 0){
                    return res.status(401).json({msg : 'Not Authorization'})
                }

               const data = {Title,Views,Date,Desc,VideoPath}

               res.status(200).json({msg : 'Success', data,datas:FilterMap})
            })
        }else{
              //videOk
              const VideoOk = await VideosById(req.params.id)
              if(!VideoOk){
                  return res.status(401).json({msg : 'Not Authorization'})
              }

              //destucrion
              const {Title,Views,Date,Desc,VdFile,VdType} = VideoOk

              //decodedVideo
              const VideoData = VdFile.toString('base64')
              //videoPath
              const VideoPath = `data:${VdType};base64,${VideoData}`

                //getViews
                    //change to number
                    let View = parseInt(Views)

                    View += 1

                    //changetostring
                    let NewView = View.toString()

                    //update views
                    const updateView = await VideoUpdateView(req.params.id,NewView)
                    if(!updateView){
                        return res.status(401).json({msg : 'Not Authorization'})
                    }

                        //ForSideVideo
                const Videos = await VideoData()

                //filterVideos
                const FilterVideo = Videos.filter((e) => e.username != decodedUser)
                if(!FilterVideo || FilterVideo.length < 0){
                    return res.status(203).json({msg : 'Not Authorization'})
                }

                //mapFilter
                const FilterMap = await Promise.all(
                    await FilterVideo.map((e) => {
                       const {_id,username,Title,Views,ImgFile,ImgType} = e
    
                        //decodedImg
                        const ImgData = ImgFile.toString('base64')
                        //imgPath
                        const ImgPath = `data:${ImgType};base64,${ImgData}`

                        return {_id,username,Title,Views,ImgPath}
                    })
                )

                if(!FilterMap || FilterMap.length < 0){
                    return res.status(401).json({msg : 'Not Authorization'})
                }

               const data = {Title,Views,Date,Desc,VideoPath}

               res.status(200).json({msg : 'Success', data,datas:FilterMap})
        }
    }catch(error){
         res.status(500).json({msg : 'Internal Server Error'})
    }
}

//deleteVIdeo

const doDeleteVideo = async (req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //decoded
            const decodedUser = decoded.username
            //dataOk
            const dataOk = await UserOne(decodedUser)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //profileOk
            const ProfileOk = await getOneProfilebyname(decodedUser)
            if(!ProfileOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //checkVideo
            const VideoOk = await VideosById(req.params.id)
            if(!VideoOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const deleted = await VideosDelete(req.params.id)
            if(!deleted){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.status(203).json({msg : 'Success Delete'})
        })
    }catch(error){
        res.status(500).json({msg :'Internal Server Error'})
    }
}

module.exports = {doAddVideo,getVideos,getVideoUpload,watchVideo,doDeleteVideo}