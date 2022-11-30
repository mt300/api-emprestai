const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const Data = require("./data");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/posts",(req,res)=>{
    console.log("Tudo ok");
    // res.json(Data);
    res.statusCode = 200;
    res.json({arr:Data})
})

app.get("/post/:id",(req,res)=>{
    var id = req.params.id;
    var post = Data.find(el => (el.id == id));
    if(post != undefined){
        res.json(post);
    }
    // console.log("id: " + req.params.id);
})

app.post("/post", (req,res) => {
    var {id, user, voltage, deadLine, desc} = req.body;

    Data.push({
        id: id,
        user: user,
        voltage: voltage,
        deadLine: deadLine,
        desc: desc
    });
    res.status(200);
    res.send("boa");
});

app.delete("/post/:id", (req,res) => {
    var id = req.params.id;
    var index = Data.findIndex( i => i.id == id);
    if(index >= 0){
        Data.splice(index,1);
        res.sendStatus(200);
    }
});

//testar
app.put("/post/:id", (req,res) => {
    var id = req.params.id;
    var{user,voltage,desc,deadLine} = req.body;

    var post = Data.find( el => { el.id == id});

    if(post == undefined ){
        console.log("erro");
    }else {
        if(user != undefined){
            post.user = user;
        }
        if(voltage != undefined){
            post.voltage = voltage;
        }
        if(deadLine != undefined){
            post.deadLine = deadLine;
        }
        if(desc != undefined){
            post.desc = desc;
        }

        res.sendStatus(200);
    }
})

app.listen(8080,()=>{
    console.log("Api Running");
})