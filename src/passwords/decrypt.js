const bycrypt = require('bcryptjs')


compare = (hash, password) =>
{
    const value = bycrypt.compareSync(hash,password);
    return value;
}

//console.log(compare("YelTec",'$2a$10$5xWzrHl1Vsct72BcgNsEPuGN/uIRDwoF6qDIIcIxZUk6Hn6FWVPGO' ))
 
module.exports = compare;