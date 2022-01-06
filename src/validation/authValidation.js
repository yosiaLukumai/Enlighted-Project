const {check} = require("express-validator")

let validateRegister = {
    check('email').isEmail().withMessage("invalid email").trim(),
    check("password").isLenght({min:7,max:12}).withMessage("length of password should be 7-12")
  
}


module.exports =
{
    validateRegister:validateRegister
}