const Sequelize = require("sequelize");
const connection = require("../database/database");
const User = require("../users/User");

const Post = connection.define('posts',{
    object:{
        type: Sequelize.STRING,
        allowNull: false
    },
    deadline: {
        type: Sequelize.STRING,
        allowNull: false
    },
    voltage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    userEmail: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    userName: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

User.hasMany(Post);
Post.belongsTo(User);

Post.sync({force: false});

module.exports = Post;