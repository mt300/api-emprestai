const jwt = require("jsonwebtoken");
JWTSecret = "random";
function auth(req,res,next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        
        const bearer = authToken.split(" ");
        const token = bearer[1];

        jwt.verify(token,JWTSecret, (err,data) => {
            if(err){
                res.status(401);
                res.json({err:"Invalid Token"});
            }else{
                req.token = token;
                req.loggedUser = {name:data.name,email: data.email,city:data.city, id:data.id}
                next();
            }
        });

    }else{
        res.status(401);
        res.json({err:"Invalid Token"});
    }

    // return next();
}

module.exports = auth;