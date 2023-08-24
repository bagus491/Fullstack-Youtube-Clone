//first settup
const express = require('express')
const app = express()
const port = 3000



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
    windowMs: 10*60*1000,
    max : 100,
    message: 'You have Many Request'
}))

//cors
const cors = require('cors')
app.use(cors({
    origin: true,
    credentials: true,
}))









//first setup
app.listen(port,() => {
    console.log(`this server Runnin on port ${port}`)
})