const mongoose = require('mongoose')



const DSSchema = new mongoose.Schema({
    Subscribe: String,
    Subscriber: String,
})



const datasubs = mongoose.model('datasubs',DSSchema)


module.exports = datasubs