const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/database');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
