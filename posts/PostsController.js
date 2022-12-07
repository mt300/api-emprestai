const express = require("express");
const router = express.Router();
const Post = require("./Post");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/Auth");

// Funciona
router.get("/posts",auth,(req,res)=>{
    Post.findAll().then( posts => {
        res.statusCode = 200;
        res.json({posts: posts});
    }).catch( err => {
        res.statusCode = 400;
        res.send("Internal Problem: " + err);
    })
});
// funciona
router.get("/posts/:type",auth,(req,res)=>{
    var type = req.params.type;
    Post.findAll({
        where:{
            type:type
        }
    }).then( posts => {
        res.statusCode = 200;
        res.json({posts: posts});
    }).catch( err => {
        res.statusCode = 400;
        res.send("Internal Problem: " + err);
    })
});
//funciona
router.get("/post/:id",auth,(req,res)=>{
    var id = req.params.id;
    Post.findOne({
        where:{
            id:id
        }
    }).then(post => {
        if(post != undefined){
            res.statusCode = 200;
            res.json({post:post});
        }else{
            res.statusCode = 400;
            res.send("Invalid post")
        }
    }).catch( err => {
        res.statusCode = 400;
        res.send("Internal error");
    });
})

//funciona
router.post("/post", auth,(req,res) => {
    var {userId, voltage, object, deadLine, desc, type} = req.body;

    Post.create({
        userId: userId,
        object: object,
        voltage: voltage,
        deadline: deadLine,
        description: desc,
        active: true,
        type: type
    }).then( () => {
        res.status(200);
        res.send("Post created.");
    }).catch( err => {
        res.statusCode = 400;
        res.send("Internal error: " + err);
    });

});

// Funciona
// router.delete("/post/:id",auth, (req,res) => {
//     var id = parseInt(req.params.id);
//     if( isNaN(id) || id == undefined){
//         res.statusCode = 400;
//         res.send("Bad request");
//     }else{
//         Post.destroy({
//             where:{
//                 id:id
//             }
//         }).then(() => {
//             res.statusCode = 200;
//             res.send("Post deleted.");
//         }).catch( err => {
//             res.statusCode = 400;
//             res.send("Bad request");
//         })
//     }
// });

//funciona
router.put("/post/:id",auth, (req,res) => {
    var id = req.params.id;
    var{user,voltage,desc,deadLine,object,active} = req.body;

    var data = {};

    if(user != undefined){
        data = {...data,user: user};
    }
    if(voltage != undefined){
        data = {...data,voltage:voltage};
    }
    if(deadLine != undefined){
        data = {...data,deadline:deadLine};
    }
    if(desc != undefined){
        data = {...data,description:desc};
    }
    if(object != undefined){
        data = {...data,object:object};
    }
    if(active != undefined){
        data = {...data,active:active};
    }
    Post.update(data,{
        where:{
            id: id
        }
    }).then( () => {    
        
        res.statusCode = 200;
        res.send("Post updated");
        
    }).catch( err => {
        res.statusCode = 400;
        res.send("Bad request");
    });
})





module.exports = router;