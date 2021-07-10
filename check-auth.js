const jwt = require("jsonwebtoken");
const key = require("./config/keys.js").secretOrKey;
module.exports = (req, res, next) => {
    try{
        const decoded =jwt.verify(req.body.token,key);
        req.User =decoded;
       console.log('kk');
        next();
    }catch(error){
        console.log('hi');
       console.log(req.json);
        return res.status(400).json({
            message:'login first'
        });
    }
};