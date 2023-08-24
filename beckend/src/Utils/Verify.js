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




module.exports = {Validator,jwt,secret}