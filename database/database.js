const Sequelize = require("sequelize");
const connection = new Sequelize('emprestaai','demo','password',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    timezone: "-03:00"
});

module.exports = connection;