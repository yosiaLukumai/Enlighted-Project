const model = require('../Models/users')
const decrypt = require('../passwords/decrypt')
const bycrypt = require('bcryptjs')

const findUserByEmail = async (email) => {
    
    try {
        let user = await model.findOne({where: {email: email}})
        return user;
    }
    catch (err) {
        return err;
    }
}


const comparePassword = async(user, password) => {
    try
    {
        let compare = await bycrypt.compare(password, user.password);
        return compare;
    }
    catch (err)
    {
        return err;
    }
}

const findUserById =  (id)=>
{
    return new Promise(async(resolve, reject)=>
    {
        try
    {
    let obtained = await model.findByPk(id)
    if(obtained)
    {
        resolve(obtained);
    }
    }
    catch (err)
    {
       reject(err);
    }    
    })
    
}

module.exports = {
    comparePassword: comparePassword,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById
}