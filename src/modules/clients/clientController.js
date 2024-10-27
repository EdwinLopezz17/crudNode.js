
const Client = require('./models/Client')

async function getAll() {
    return await Client.findAll();
}

async function addClient(data) {
    return await Client.create(data);
}

async function getById(id){
    return await Client.findByPk(id);
}

async function updateClient(id, data){
    const client = await Client.findByPk(id);

    if(client){
        return await client.update(data);
    }

    throw new Error(`Client with id ${id} not found`);
}

async function deleteClient(id){
    const client = await Client.findByPk(id);
    if(client){
        return await client.destroy();
    }
    throw new Error(`Client with id ${id} not found`);
}

module.exports = {
    getAll,
    addClient,
    getById,
    updateClient,
    deleteClient,
};
