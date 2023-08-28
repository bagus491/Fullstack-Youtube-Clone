const Sequlize = require('sequelize')
const sequelize = new Sequlize('cloneyt','root','',{
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