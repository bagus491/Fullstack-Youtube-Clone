const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/cloneyt';


mongoose.connect(url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log('success connect mongodb')
}).catch((err) => {
    console.log('Erro Connect Mongodb', err)
})