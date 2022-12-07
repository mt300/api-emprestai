const Sequelize = require("sequelize");
const connection = require("../database/database");
// const Post = require("../posts/Post");

const User = connection.define('users',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


User.sync({force: false});

module.exports = User;