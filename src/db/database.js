const {Sequelize} = require('sequelize');
const config = require('../config/appConfig');

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: 'mysql',
    }
);


module.exports = sequelize;

