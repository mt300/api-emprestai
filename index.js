const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./database/database");
const session = require("express-session");
const app = express();

const usersController = require("./users/UsersController");
const postsController = require("./posts/PostsController");




app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// session
app.use(session({
    secret: "random",
    cookie: {maxAge: 30000000},
    resave: true,
    saveUninitialized: true
}));

//database

connection
    .authenticate()
    .then( () => {
        console.log("Connected Succesfully");
    }).catch( err => {
        console.log(err);
    });


//controlers
app.use("/",usersController);
app.use("/",postsController);



app.listen(8080,()=>{
    console.log("Api Running");
})