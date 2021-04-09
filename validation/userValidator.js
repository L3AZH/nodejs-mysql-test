const User = require("../database/models/User")
const {body, param, validationResult} = require("express-validator")
const { ErrorResponse } = require("../models/errorResponse")

module.exports = {
    userInsertValidation:[
        body("username","The name must be of minimun 3 characters")
            .optional()
            .isLength({min:3})
            .trim()
            .unescape()
            .escape(),
        body("email","Invalid email address")
            .optional()
            .trim()
            .unescape()
            .escape()
            .isEmail()
            .custom(async (value)=>{
                const dataResult = await User.findOne({
                    where:{email:[value]}
                })
                if(dataResult != null){
                    return  Promise.reject(new ErrorResponse(400,{message: "Email already have used!"}))
                }
            }),
        body("password","The name must be of minimun 4 characters")
            .optional()
            .trim()
            .unescape()
            .escape()
            .isLength({min:4})
    ],
    userID:[param("id","Invalid User ID").trim().isInt()],
    result:(req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).json(new ErrorResponse(422,{errors:errors.array()}))
        }
        next()
    },
}