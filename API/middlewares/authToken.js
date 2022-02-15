const jwt = require('jsonwebtoken');

exports.verifyToken = function(req, res, next){
    let token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({message:"No token provided"});
    }
    jwt.verify(token, 'CONTACT_API', (error, decoded)=>{
        if(error){
            return res.status(401).send({message:'Not authorized!'});
        }
        req.userId = decoded.id;
        next();
    })
};