const Sequlize = require('sequelize')
const sequelize = new Sequlize('cloneyt','baguskalam','1-uCkYsb]2yfqU2r',{
    host: 'localhost',
    dialect:'mysql'
})




sequelize.authenticate()
    .then(() => {
        console.log('Success Connect mysql')
    })
    .catch(err => {
        console.log('Err Connect Database', err)
    })