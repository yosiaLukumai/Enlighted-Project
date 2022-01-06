const database = require('../configs/database');
const {Sequelize, DataTypes } = require('sequelize');


const User = database.define("Users", {
    username:
    {
        type: DataTypes.STRING,
        unique:true
    },
    password:
    {
        type:DataTypes.STRING
    }
},
{
    freezeTableName: true
})


module.exports = User;