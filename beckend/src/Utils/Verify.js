//express-validator
const {check,body} = require('express-validator')

//users
const {UserOne} = require('../Utils/FlowDbq')

//profile
const {getProfile,getOneProfilebyname} = require('../Utils/FlowDbm')

//token
const jwt = require('jsonwebtoken')
const secret = '!@#$%^&*()_+-=93}{|<>'


const Validator = [
    check('username').custom(async (value) => {
        const duplikat = await UserOne(value)
        if(duplikat){
            throw new Error('username exist')
        }else{
            return true
        }
    }),
    check('password').isLength({min: 5}).withMessage('Pass Length min 5'),
    check('email').isEmail().withMessage('Email Didnt Valid'),
]


//loginPages
const CheckToken = (req,res) => {
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

            const dataOk = await UserOne(decodedUser)
            if(!dataOk){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            //validate decoded with data
            if(decodedUser !== dataOk.username){
                return res.status(401).json({msg : 'Not Authorization'})
            }

            return res.status(200).json({msg : 'Success'})
            
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}


//profile
const CheckPrName = [body('PrName').custom(async (value) => {
    const duplikat = await getProfile(value)
    console.log(duplikat)
    if(duplikat){
        throw new Error('Profile Name Exist')
    }else{
        return true;
    }
})]



module.exports = {Validator,jwt,secret,CheckToken,CheckPrName}