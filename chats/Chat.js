const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../users/User");

const Chat = connection.define('chats',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

User.hasMany(Chat);
Chat.belongsTo(User);

Chat.sync({force:false});

module.exports = Chat;