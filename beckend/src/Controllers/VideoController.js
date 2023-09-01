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
                return res.status(404).json({msg : 'Not Authorization'})
            }

            //checkProfile
            const ProfileOk = await getOneProfilebyname(decodedUser)
            if(!ProfileOk){
                return res.status(203).json({msg : 'Profile Doesnt Exist'})
            }

            const {Title,Desc} = req.body

            //PROFILE
            const {PrName} = ProfileOk
            
            //date
            const date = new Date()
            
            //views
            let Views = "0"

            //validasi Video
            const VideoUpload = req.files['Video'][0].mimetype
            //valid format
            const VideoValid = ['mp4','mov','avi'];
            // get array  , lalu jadikan array dengan pemisan '/'
            const CheckType = VideoUpload.split('/');
            //setelah itu dapetin last index atau format
            const getFormat = CheckType[CheckType.length - 1];
            //lalu find atau cari atau cocokan dengan format
            const filterChecker = VideoValid.find((e) => e === getFormat);
            
            if(!filterChecker){
                return res.status(401).json({msg : 'Your Upload Video Not Video'})
            }

            //validasi poster
            const PosterUpload = req.files['Poster'][0].mimetype;
            //validformat
            const PosterValid = ['jpeg','jpg','png'];
            //split
            const CheckPoster = PosterUpload.split('/');
            //format
            const getFormatPoster = CheckPoster[CheckPoster.length - 1];
            //filterPoster
            const FindFormat = PosterValid.find((e)=> e === getFormatPoster);

            if(!FindFormat){
                return res.status(401).json({msg : 'Your Upload Poster Not Poster'})
            }

            //addviews
            const add = addVideo(decodedUser,PrName,Title,Views,date,Desc,req.files['Video'][0],req.files['Poster'][0])

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
            await Videos.map(async (e) => {
                const {_id,PrName,Title,Views,VdFile,VdType,ImgFile,ImgType} = e

                //decodedVIDEO
                const videDeco = VdFile.toString('base64');
                //path
                const videoPath = `data:${VdType};base64,${videDeco}`;

                //decodedPoster
                const ImgDeco = ImgFile.toString('base64');
                //path
                const ImgPath = `data:${ImgType};base64,${ImgDeco}`
                
                  //getProfile //for pict
                 const ProfileOk = await getProfile(PrName)
                 if(!ProfileOk){
                    return res.status(404).json({msg : 'Not Authorization'})
                 }

                 //decodedImage
                 const ImageData = ProfileOk.ImgFile.toString('base64');
                 //imagePath
                 const ProfilePath = `data:${ProfileOk.ImgType};base64,${ImageData}`;

                return {_id,PrName,Title,Views,videoPath,ImgPath,ProfilePath}
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
        //checkProfile
        const profileOk = await getProfile(req.params.PrName)
        if(!profileOk){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        //dataVideos
        const videos = await VideosData()

        //filtervideo by Profileok
        const {PrName} = profileOk

        //filter
        const FilterData = videos.filter((e) => e.PrName ===  PrName);
        if(!FilterData || FilterData.length < 0){
            return res.status(404).json({msg : 'Videos Doenst Exist'})
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
    }catch(error){
        res.status(500).json({msg: 'Internal Server Error'})
    }
}

//watchVideo
const watchVideo = async(req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization
        console.log(token)
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
                    return res.status(203).json({msg : 'Not Authorization'})
                }
                

                //destucrion
                const {username,Title,Views,Date,Desc,VdFile,VdType} = VideoOk

                //decodedVideo
                const VideoData = VdFile.toString('base64')
                //videoPath
                const VideoPath = `data:${VdType};base64,${VideoData}`

                //checkuser
                if(username !== decodedUser){
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

                //Find Profile by username VideoOk
                // add this
                const ProfileOk = await getOneProfilebyname(username);
                if(!ProfileOk){
                    return res.status(203).json({msg : 'Not Authorization'})
                }
                   //  error disini
                const {_id,PrName,Subs,ImgFile,ImgType} = ProfileOk

                //decodedImage
                const ImageData = ImgFile.toString('base64');
                //imagePath
                const ImagePath = `data:${ImgType};base64,${ImageData}`;
        
                //newObject
                const DataProfile = {_id,PrName,Subs,ImagePath};

                //to this


                //ForSideVideo
                   //  error disini
                const Videos = await VideosData()

                //adding
                //before filter by id , must filter 
                //Filter Videos for != username 
                //algortima ini buat agar video di side tidak menampilkan atau rekomendasi video yang tidak sesuai username users
                const newVideos = Videos.filter((e) => e.username != username)
                if(!newVideos || newVideos.length < 0){
                    return res.status(203).json({msg : 'Not Authorization'})
                }

    
                //filterVideos
                const FilterVideo = newVideos.filter((e) => e._id.toString() != req.params.id.toString())
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
                    return res.status(203).json({msg : 'Not Authorization'})
                }

               const data = {Title,Views,Date,Desc,VideoPath}

               res.status(200).json({msg : 'Success', data,datas:FilterMap,DataProfile})
            })
        }else{
              //videOk
              const VideoOk = await VideosById(req.params.id)
              if(!VideoOk){
                  return res.status(203).json({msg : 'Not Authorization'})
              }

              //destucrion
              //lupa useranme
              const {username,Title,Views,Date,Desc,VdFile,VdType} = VideoOk

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

                 //Find Profile by username VideoOk
                // add this
                const ProfileOk = await getOneProfilebyname(username);
                if(!ProfileOk){
                    return res.status(203).json({msg : 'Not Authorization'})
                }
                     //  error disini
                const {_id,PrName,Subs,ImgFile,ImgType} = ProfileOk

                //decodedImage
                const ImageData = ImgFile.toString('base64');
                //imagePath
                const ImagePath = `data:${ImgType};base64,${ImageData}`;
        
                //newObject
                const DataProfile = {_id,PrName,Subs,ImagePath};

                //to this

                 //ForSideVideo
                //  error disini
                const Videos = await VideosData()

                //filterVideos
                //changes di sini filter berdasarkan id video dari req.params.id
                const FilterVideo = Videos.filter((e) => e._id.toString() != req.params.id.toString())
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

               res.status(200).json({msg : 'Success', data,datas:FilterMap,DataProfile})
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