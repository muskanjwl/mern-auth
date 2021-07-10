const jwt = require("jsonwebtoken");
const key = require("./config/keys.js").secretorkey;
module.exports = (req, res, next) => {
    try{
        const decoded =jwt.verify(req.body.token,key);
        next();
    }catch(error){
        return res.status(400).json({
            message:'login first'
        });
    }
};