const User = require('../Models/Users')



//getAll
const UserGet = async () => {
    return await User.findAll()
}

//getOne
const UserOne = async(username) => {
    const Users = await UserGet()
    const mappUser = await Users.map((e) => e.toJSON())
    //getOne
    const user = mappUser.find((e) => e.username === username);
    return user
}

//getOneById
const UserOneById = async(id) => {
    const Users = await UserGet()
    const mappUser = await Users.map((e) => e.toJSON())
    //getOne
    const user = mappUser.find((e) => e.id === id);
    return user
}

//insertUser
const NewUser = async(username,password,email) => {
    return await User.create({
        username,
        password,
        email
    })
}


module.exports = {UserOne,NewUser,UserOneById}