const express = require('express');
const response = require('../../red/response');
const clientController = require('./clientController');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allClients = await clientController.getAll();
        response.success(req, res, allClients, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

router.post('/', async (req, res) => {
    try {
        const newClient = await clientController.addClient(req.body);
        response.success(req, res, newClient, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

router.get('/:id', async (req, res)=>{
    try{
        const client = await clientController.getById(req.params.id);
        if(client){
            response.success(req,res, client, 200);
        }else{
            response.error(req, res, 'Client not found')
        }
    }catch(error){
        response.error(req, res, error.message, 500);
    }
})

router.put('/:id', async(req, res)=>{
    try{
        const updateClient = await clientController.updateClient(req.params.id, req.body);
        response.success(req, res, updateClient, 200);
    }catch(error){
        response.error(req, res, error.message, 500);
    }
})

router.delete('/:id', async (req, res)=>{
    try{
        await clientController.deleteClient(req.params.id);
        response.success(req, res, 'Client deleted successfully',200);
    }catch(error){
        response.error(req, res, error.message, 500);
    }
})

module.exports = router;
