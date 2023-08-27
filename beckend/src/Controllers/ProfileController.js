//import
const {addProfile,getProfile,deleteProfile,updateProfile,updateSub,
addSubs,getSubs,delSubs
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

            const error = validationResult(req)
              if(!error.isEmpty()){
            return res.status(203).send(error.array())
            }

            const Subs = "0";
            const {PrName,Desc} = req.body

            const Profile = addProfile(decodedUser,PrName,Subs,Desc,req.file)

            if(!Profile){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            res.status(201).json({msg : 'Success'})
        })

    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//getProfile
const ProfileGet = async (req,res) => {
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

            const ProfileOk = await getProfile(req.params.PrName)
            if(!ProfileOk){
                return res.status(203).json({msg : 'Not Authorization'})
            }

            const {_id,PrName,Subs,Desc,ImageFile,ImageType} = ProfileOk

            //decodedImage
            const ImageData = ImageFile.toString('base64');
            //imagePath
            const ImagePath = `data:${ImageType};base64,${ImageData}`;

            //newObject
            const Data = [_id,PrName,Subs,Desc,ImagePath];

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
                return res.status(203).json({msg : 'Not Authorization'})
            }

            if(ProfileOk.username != decodedUser){
                const {Subs} = ProfileOk

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
                if(!newSubscriber){
                    return res.status(401).json({msg : 'Not Authorization'})
                }
    
                res.status(203).json({msg : 'Success'})
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
                return res.status(203).json({msg : 'Not Authorization'})
            }

            if(ProfileOk.username != decodedUser){
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
                return res.status(203).json({msg : 'Not Authorization'})
            }

            if(ProfileOk.username != decodedUser){
                const {Subs} = ProfileOk

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

module.exports = {doAddProfile,ProfileGet,doDeleteProfile,doUpdateProfile,doSubs,CheckSubs,doUnSubs}