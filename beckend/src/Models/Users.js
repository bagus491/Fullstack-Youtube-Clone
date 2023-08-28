const Sequlize = require('sequelize')
const sequelize = new Sequlize('cloneyt','root','',{
    host: 'localhost',
    dialect:'mysql'
})


const users  = sequelize.define('users', {
    id: {
        type : Sequlize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequlize.STRING,
    password: Sequlize.STRING,
    email: Sequlize.STRING
},{timestamps: false})


module.exports = users