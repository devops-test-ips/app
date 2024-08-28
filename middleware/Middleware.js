const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const verifyToken=(req,resp,next)=>{
    const token = req.headers['authorization'];
    if(!token){
        return resp.status(400).json({'message': 'empty token'});
    }

    try{
        const decodedValue = jwt.verify(token,secret);
        req.user=decodedValue;
        next();
    }catch (e) {
        return resp.status(403).json({'message': 'invalid token'});
    }
}

module.exports = verifyToken;