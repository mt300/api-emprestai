const express = require("express");
const router = express.Router();
const Chat = require("./Chat");
const auth = require("../middlewares/Auth");

router.get("/chats", auth, (req,res) => {
    Chat.findAll().then( chats => {
        if(chats != undefined){
            res.statusCode = 200;
            res.json(chats);
        }else{
            res.statusCode = 400;
            res.send("Internal error");
        }
    }).catch( err => {
        res.statusCode = 400;
        res.send(err);
    })
})

router.post("/chat", auth, (req,res) => {
    var {title,question,userId, userEmail} = req.body;
    Chat.create({
        title: title,
        question: question,
        userId: userId,
        userEmail: userEmail
    }).then( () => {
        res.statusCode = 400;
        res.send("Chat created");
    }).catch( err => {
        res.statusCode = 400;
        res.send(err);
    })
})

router.put("/chat/:id", auth, (req,res) => {
    var answer = req.body.answer;
    var id = req.params.id;

    Chat.update({answer},{where:{
        id:id
    }}).then( () => {
        res.statusCode = 200;
        res.send("Chat answered")
    }).catch( err => {
        res.statusCode = 400;
        res.send(err);
    });
})


module.exports = router;