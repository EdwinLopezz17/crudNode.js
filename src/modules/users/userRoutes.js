require('dotenv').config();

const express = require('express');
const response = require('../../red/response');
const userController = require('./userController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
    
    const user ={
        username:req.body.username,
        password: await bcrypt.hash(req.body.password.toString(), 5),
    }

    try {
        const newUser = await userController.addUser(user);
        response.success(req, res, newUser, 201);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userController.getUserByUsername(username);
        if (!user) {
            return response.error(req, res, 'Usuario no encontrado', 404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.error(req, res, 'Contraseña incorrecta', 401);
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
            expiresIn: '24h' 
        });

        response.success(req, res, { token }, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


module.exports = router;



