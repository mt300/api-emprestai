const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/Auth.js");
const jwt = require("jsonwebtoken");
const Mail = require("../mail/Mail");

const JWTSecret = "random";

function passGen(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

router.get("/users",auth, (req,res) => {
    User.findAll().then( users => {
        res.status(200);
        res.send({users})
    }).catch( err => {
        res.status(400);
        res.json({err})
    })
})

router.put("/recovery", (req,res) => {
    var email = req.body.email;
    if(email != undefined && email != ''){
        User.findOne({
            where:{email:email}
        }).then( user => {
            if(user != undefined){
                var password = passGen(6); 
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
                User.update({password:hash},{
                    where:{email:email}
                }).then(() => {
                    Mail(email,"Olá, sua senha é: " + password + "  Recomendamos que a altere o quanto antes.");
                    res.status(200);
                    res.json({msg:"password sent to email"})
                }).catch( err => {
                    res.status(400);
                    res.json({msg:"Error: internal database error"})    
                })
                
            }else{
                res.status(401)
                res.json({msg:"Error: user not found"})
            }
        })
    }else{
        res.status(401)
        res.json({msg:"Error: invalid email sent"})
    }    
})

router.post("/auth", (req,res) => {
    var {email, password} = req.body;
    if(email != undefined){
        User.findOne({where:{email:email}}).then( user => {
            if(user != undefined){
                bcrypt.compare(password,user.password).then( correct => {
                    if(correct){
                    
                        jwt.sign({name: user.name, email: user.email, city: user.city, id: user.id}, JWTSecret, {expiresIn:'48h'},(err,token) =>{
                            if(err){
                                res.status(400);
                                res.json({err:"Internal Failure"});
                            }else{
                                req.session.user = {
                                 
                                }
                                res.status(200);
                                res.json({
                                    token:token,
                                    loggedUser:{
                                        id: user.id,
                                        email: user.email,
                                        name: user.name,
                                        city: user.city
                                    }
                                });
                            }
                        });
    
                    }else{
                        res.status(401);
                        res.send("BAD Authentication. Password does not match this user");
                    }
                })
                
            }else {
                res.status(404);
                res.send("email doesn't exists");
            }
        });
    }else{
        res.status(400);
        res.send( "Invalid email");
    }
});

router.post("/user", (req,res) => {
    var {name,email,password,city} = req.body;   

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if( name != undefined && email != undefined && password != undefined){
        User.findOne({where:{email:email}}).then( user => {
            if(user != undefined){
                res.statusCode = 400;
                res.send("User already exists");
            }else{
                User.create({
                    name: name,
                    email: email,
                    password: hash,
                    city: city
                }).then( () => {
                    res.status(200);
                    res.send("User created.");
                }).catch( err => {
                    res.statusCode = 400;
                    res.send("Internal error: " + err);
                });
            }

        }).catch( e => {
            res.statusCode = 400;
            res.send("Internal error: " + e)
        });
    }else{
        res.statusCode = 400;
        res.send("Invalid fields");
    }
});

router.put("/user/:email",auth, (req,res) => {
    var email = req.params.email;
    var {name,password,city} = req.body;
    
    var data = {};
    // creating object
    if(name != undefined){
        data = {...data,name:name}
    }
    if(password != undefined){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        data = {...data,password:hash}
    }
    if(city != undefined){
        data = {...data,city:city}
    }
    User.update(data,{
        where:{email:email}
    }).then(() => {
        res.statusCode = 200;
        res.send("User updated");
        
    }).catch( err => {
        return res.sendStatus(400);
        // res.send("Internal Error");
        
    })
});

module.exports = router;