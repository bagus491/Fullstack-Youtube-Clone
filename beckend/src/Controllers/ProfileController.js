//import
const {addProfile,getProfile,deleteProfile,updateProfile,updateSub,
addSubs,getSubs,delSubs, getOneProfilebyname
} = require('../Utils/FlowDbm')

//jwt
const {jwt,secret} = require('../Utils/Verify')

//profile
const {UserOne} = require('../Utils/FlowDbq')
const { validationResult } = require('express-validator')

//CheckerToken


//addProfile
const doAddProfile = async (req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async (err,decoded) => {
            if(err){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const decodedUser = decoded.username

            //users
            const DataOk = await UserOne(decodedUser)
            if(!DataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //error di sini(1)
            const error = validationResult(req)
              if(!error.isEmpty()){
            return res.status(203).send(error.array())
            }
            
        
            const Subs = "0";
            const {PrName,Desc} = req.body

              //validasi poster
              const PosterUpload = req.files.mimetype;
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

            const Profile =  addProfile(decodedUser,PrName,Subs,Desc,req.file)

           
            //saved
            // error karena lupa menambahkan ini 
            const profilesSave = await Profile.save()

            if(!profilesSave){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.status(201).json({msg : 'Success'})
        })

    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//getProfile
//by PrName
const ProfileGet = async (req,res) => {
    try{
        const ProfileOk = await getProfile(req.params.PrName)
        if(!ProfileOk){
            return res.status(404).json({msg : 'Not Authorization'})
        }

        const {_id,PrName,Subs,Desc,ImgFile,ImgType} = ProfileOk

        //decodedImage
        const ImageData = ImgFile.toString('base64');
        //imagePath
        const ImagePath = `data:${ImgType};base64,${ImageData}`;

        //newObject
        const Data = {_id,PrName,Subs,Desc,ImagePath};

        res.status(200).json({msg : 'Success',Data})
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//checkProfile
const CheckProfile = async (req,res) => {
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
            //dataOk
            const DataOk  = await UserOne(decodedUser)
            if(!DataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const ProfileOk = await getOneProfilebyname(decodedUser)
            if(!ProfileOk){
                return res.status(404).json({msg : 'Not Authorization'})
            }

            const {_id,PrName,Subs,Desc,ImgFile,ImgType} = ProfileOk

            //decodedImage
            //edited(1)
            const ImageData = ImgFile.toString('base64');
            //imagePath
            const ImagePath = `data:${ImgType};base64,${ImageData}`;

            //newObject
            //edited
            const Data = {_id,PrName,Subs,Desc,ImagePath};

            res.status(200).json({msg : 'Success',Data})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//deleteProfile
const doDeleteProfile = async(req,res) => {
    try{
        const token = req.cookies.token || req.headers.authorization
        if(!token){
            return res.status(401).json({msg : 'Not Authorization'})
        }

        jwt.verify(token,secret,async(err,decoded) => {
            if(err) {
                return res.status(401).json({msg : 'Not Authorization'})
            }

            const decodedUser = decoded.username

            //dataOk
            const DataOk = await UserOne(decodedUser)
            if(!DataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //profile
            const ProfileOk = await getOneProfilebyname(decodedUser)
            if(!ProfileOk){
                return res.status(203).json({msg : 'Not Authorization'})
            }

            const Delete = await deleteProfile(decodedUser)
            if(!Delete){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.status(203).json({msg : 'Success Delete'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//updateProfile
const doUpdateProfile = async(req,res) => {
    try{
            const token = req.cookies.token || req.headers.authorization
            if(!token){
                return res.status(401).json({msg : 'Not Authorization'})
            }
    
            jwt.verify(token,secret,async(err,decoded) => {
                if(err) {
                    return res.status(401).json({msg : 'Not Authorization'})
                }
    
                const decodedUser = decoded.username
                //dataOk
                const DataOk = await UserOne(decodedUser)
                if(!DataOk){
                    return res.status(401).json({msg : 'Not Authorization'})
                }
    
                 //profile
                 const ProfileOk = await getOneProfilebyname(decodedUser)
                 if(!ProfileOk){
                     return res.status(203).json({msg : 'Not Authorization'})
                 }

                 const error = validationResult(req)
                 if(!error.isEmpty()){
                    const getArray = error.array()

                    //find
                    const getValue = {...getArray}

                    //jika value  error tidak sama dengan decodeduser artinya value dari inputan berbeda dengan decoded
                    if(getValue.value !== decodedUser){
                        return res.status(203).send(error.array())
                    }
                    
                    //kalau sama maka akan eksekusi ini
                    const {_id,Subs} = ProfileOk

                    const {Desc} = req.body
       
                    //update
                    const update = await updateProfile(_id,decodedUser,getValue.value,Subs,Desc)
                    if(!update){
                       return res.status(401).json({msg : 'Not Authorization'})
                    }
                    return res.status(203).json({msg: 'Success Update'})
                 }

                 //tapi kalau gak ada error berarti belum ada sama sekali Prname
                 const {_id,Subs} = ProfileOk

                 const {PrName,Desc} = req.body
    
                 //update
                 const update = await updateProfile(_id,decodedUser,PrName,Subs,Desc)
                 if(!update){
                    return res.status(401).json({msg : 'Not Authorization'})
                 }
                     res.status(203).json({msg:'Success Update'})
            })
       
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//updateSub
const doSubs = async(req,res) => {
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
            //dataok
            const DataOk = await UserOne(decodedUser)
            if(!DataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //profileOk
            const ProfileOk = await getProfile(req.params.PrName)
            if(!ProfileOk){
                return res.status(404).json({msg : 'Not Authorization'})
            }

            if(ProfileOk.username != decodedUser){
                const {PrName,Subs} = ProfileOk

                let CSubs = parseInt(Subs)
    
                CSubs += 1
    
                let NewSubs = CSubs.toString()
    
                //updateSubs
                const UpdateSub = await updateSub(PrName,NewSubs)
                if(!UpdateSub){
                    return res.status(401).json({msg : 'Not Authorization'})
                }

                //updatesubscribe
                const newSubscriber = await addSubs(decodedUser,PrName)

                //saved
                const saveNewSub = await newSubscriber.save()
                if(!saveNewSub){
                    return res.status(401).json({msg : 'Not Authorization'})
                }
    
                res.status(201).json({msg : 'Success'})
            }

          
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//checksubscribe
const CheckSubs = async(req,res) => {
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
            //dataok
            const DataOk = await UserOne(decodedUser)
            if(!DataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //profileOk
            const ProfileOk = await getProfile(req.params.PrName)
            if(!ProfileOk){
                return res.status(404).json({msg : 'Not Authorization'})
            }

            if(ProfileOk.username === decodedUser){
                return res.status(204).json({msg : 'Not Authorization'})
            }else{
                    //checkSubs
                   //array subscribe
                   const arraySubs = await getSubs()

                   //filter
                   const FiltSubs = arraySubs.filter((e) => e.Subscribe.toLowerCase() == decodedUser.toLowerCase())
                   if(!FiltSubs || FiltSubs.length < 0){
                    return res.status(203).json({msg : 'Not Subs'})
                   }
                   
                   //find
                   const FindSubs = FiltSubs.find((e) => e.Subscriber == req.params.PrName)
                   if(!FindSubs){
                       return res.status(203).json({msg : 'Not Subs'})
                   }
            }
             //jika lolos sampai sini berarti dia udah subscribce
             res.status(200).json({msg : 'Success'})

        })
    }catch(error){

    }
}

//updateSub
const doUnSubs = async(req,res) => {
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
            //dataok
            const DataOk = await UserOne(decodedUser)
            if(!DataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //profileOk
            const ProfileOk = await getProfile(req.params.PrName)
            if(!ProfileOk){
                return res.status(404).json({msg : 'Not Authorization'})
            }

            if(ProfileOk.username != decodedUser){
                const {PrName,Subs} = ProfileOk

                let CSubs = parseInt(Subs)
    
                CSubs -= 1
    
                let NewSubs = CSubs.toString()
    
                //updateSubs
                const UpdateSub = await updateSub(PrName,NewSubs)
                if(!UpdateSub){
                    return res.status(401).json({msg : 'Not Authorization'})
                }

                //array subscribe
                const arraySubs = await getSubs()

                //filter
                const FiltSubs = arraySubs.filter((e) => e.Subscribe.toLowerCase() == decodedUser.toLowerCase())

                //find
                const FindSubs = FiltSubs.find((e) => e.Subscriber == req.params.PrName)

                 //updatesubscribe
                 const oldSubscriber = await delSubs(FindSubs.Subscriber)
                 if(!oldSubscriber){
                     return res.status(401).json({msg : 'Not Authorization'})
                 }
    
                res.status(203).json({msg : 'Success'})
            }
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

module.exports = {doAddProfile,ProfileGet,doDeleteProfile,doUpdateProfile,doSubs,CheckSubs,doUnSubs,CheckProfile}