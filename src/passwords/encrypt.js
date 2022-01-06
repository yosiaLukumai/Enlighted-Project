const bycrypt = require('bcryptjs');

const hash =  (password) =>
{
    const salt =  bycrypt.genSaltSync(10);
    const hashed =  bycrypt.hashSync(password, salt);
    return hashed;
}


module.exports = hash;


//console.log(hash("YelTec"))
