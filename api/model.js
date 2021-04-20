const db = require('../data/dbConfig.js')

const getUser = (username) => {
    return db("users").where('username', '=', username).first()
};

const addUser = (user) => {
    return db("users").insert(user)
}

const deleteUser = (user) => {
    return db("users").where('username', '=', user).delete()
}


module.exports = {
    getUser,
    addUser,
    deleteUser
}