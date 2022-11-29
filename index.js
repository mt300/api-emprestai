const express = require("express");
const bodyParser = require("body-parser");
const { json } = require("body-parser");
const Data = require("./data");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser,json());

app.get("/get",(req,res)=>{
    console.log("Tudo ok");
    // res.json(Data);
    res.json({msg: "ok"})
})

app.listen(8080,()=>{
    console.log("Api Running");
})