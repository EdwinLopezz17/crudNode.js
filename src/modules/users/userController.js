
const User = require('./models/User')

async function getAllUsers() {
    return await User.findAll();
}

async function addUser(data) {
    return await User.create(data);
}

async function getUserById(id){
    return await User.findByPk(id);
}

async function updateUser(id, data){
    const user = await User.findByPk(id);

    if(user){
        return await User.update(data);
    }

    throw new Error(`User with id ${id} not found`);
}

async function deleteUser(id){
    const user = await User.findByPk(id);
    if(user){
        return await user.destroy();
    }
    throw new Error(`User with id ${id} not found`);
}

async function getUserByUsername(username) {
    return await User.findOne({ where: { username } });
}
module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByUsername,
};
