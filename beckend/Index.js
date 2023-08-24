//first settup
const express = require('express')
const app = express()
const port = 5000



//first settup middleware
//body-parser
const bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

//morgan
const morgan = require('morgan')
app.use(morgan('dev'))

//express-rate-limit
const rateLimit = require('express-rate-limit')
app.use(rateLimit({
    windowMS: 10*60*1000, // 10 minutes
    max : 100, // 100 request
    message: {error: 'You Have Many Request'}
}))

//cors
const cors = require('cors')
app.use(cors({
    origin: true,
    credentials: true,
}))

//setup two middleware
const cookieparser = require('cookie-parser')
const session = require('express-session')
app.use(cookieparser('secret'))
app.use(session({
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge: 6000},
    secret: 'secret'
}))


//database
//mongo
require('./src/Db/dbm')
//mysql
require('./src/Db/dbq')


//usersRouter
const UserRouter = require('./src/Router/UserRouter');

app.use(UserRouter);





app.use('/',(req,res) => {
    res.status(404).send('404 NOT FOUND')
})

//first setup
app.listen(port,() => {
    console.log(`this server Runnin on port ${port}`)
})