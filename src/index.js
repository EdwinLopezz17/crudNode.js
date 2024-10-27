const express = require('express');
const config = require('./config/appConfig');
const clientsEndPoints = require('./modules/clients/clientRoutes');
const userEndPoints = require('./modules/users/userRoutes')
const sequelize = require('./db/database');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

const app = express();
app.set('port', config.app.port);

//security
app.use(jwtMiddleware);

// Middleware para parsear JSON
app.use(express.json());

// Sincronizar base de datos
sequelize.sync({ force: false })  // `force: true` recrea las tablas cada vez, úsalo solo en desarrollo
    .then(() => {
        console.log('Conexión a la base de datos exitosa y sincronización de modelos completa');
    })
    .catch(error => {
        console.error('Error al conectar con la base de datos:', error);
    });

// Rutas
app.use('/api/clients', clientsEndPoints);
app.use('/api/users', userEndPoints);

app.listen(config.app.port, () => {
    console.log(`Servidor ejecutándose en el puerto ${config.app.port}`);
});
