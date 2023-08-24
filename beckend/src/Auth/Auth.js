const express = require('express')
const app = express()

//expres validator
const {validationResult} = require('express-validator')

//validator
const {Validator,jwt,secret} = require('../Utils/Verify')

//bcrypt
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

//newUser
const {NewUser,UserOne,UserOneById} = require('../Utils/FlowDbq')

//passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

//new
passport.use(new LocalStrategy({usernameField: 'username'}, async (username,password,done) => {
    try{
        const dataOk = await UserOne(username)
        if(!dataOk){
            return done(null,false,{message: 'Username Not Valid'})
        }

        const PassOk = bcrypt.compareSync(password,dataOk.password)
        if(!PassOk){
            return done(null,false,{message: 'Password Not Valid'})
        }

    return done(null,dataOk)
    }catch(error){
        return done(error)
    }
}))

//serial
passport.serializeUser((dataOk,done) => {
    done(null,dataOk.id)
});

//deserial
passport.deserializeUser(async (id,done) => {
    try{
        const dataOk = await UserOneById(id)
            return done(null,dataOk)
    }catch(error){
        return done(error)
    }
})

app.use(passport.session())
app.use(passport.initialize())

//register
const doRegister = async (req,res) => {
    try{
       const error = validationResult(req)
       if(!error.isEmpty()){
        return res.send(error.array())
       }
       
       //req.body
       const {username,password,email} = req.body

       const PassOk = bcrypt.hashSync(password,salt)

       //insert
       const insertUser = await NewUser(username,PassOk,email)

       if(!insertUser){
        return res.status(401).json({msg :'Not Authorization'})
       }

       res.status(201).json({msg : 'Success Register'})
       
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

app.post('/register',Validator,doRegister)


//loginFlow
const doLogin = (req,res) => {
    try{
        const {username} = req.body

        jwt.sign({username},secret,{expiresIn: '1h'},(err,token) => {
            if(err){
                return res.status(401).json({msg :'Not Authorization'})
            }

            res.cookie('token',token,{httpOnly:true})
            
            res.status(200).json({msg: 'success', token})
        })
    }catch(error){
        res.status(500).json({msg : 'Internal Server Error'})
    }
}

//login
app.post('/login',passport.authenticate('local',{failureMessage:'Need Check'}),doLogin)







module.exports = app