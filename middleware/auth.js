const jwt = require("jsonwebtoken")
const config = require("config")
const { ErrorResponse } = require("../models/errorResponse")
module.exports = function (req,res,next){
    const token = req.header("x-auth-token")
    if(!token) return res.status(401).json(new ErrorResponse(401,{
        message:"Access Denied, No token provide"
    }))
    try{
        const decode = jwt.verify(token,config.get("privateKey"))
        console.log(decode)
        req.user = decode
        next()
    }
    catch(err){
       return res.status(400).json(new ErrorResponse(400,{
           message:"Invalid Token"
       }))
    }
}