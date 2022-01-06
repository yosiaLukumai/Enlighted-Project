const Sequelize = require("sequelize");
const db = new Sequelize('enlighted', 'root', '12yesu34',
{
    dialect:'mysql',
    logging:false
})

module.exports = db;