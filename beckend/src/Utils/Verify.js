//express-validator
const {check} = require('express-validator')

//users
const {UserOne} = require('../Utils/FlowDbq')

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
    check('email').isEmail().withMessage('Email Didnt Valid')
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

            res.status(200).json({msg : 'Success'})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}



module.exports = {Validator,jwt,secret,CheckToken}