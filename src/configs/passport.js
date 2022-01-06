const passport = require('passport')
const LocalStategy = require('passport-local').Strategy;
// const model = require('../models/users')
// const decrypt = require('../passwords/decrypt')
const loginService = require('../services/loginService')

// const customFields = {
//     usernameField: 'email',
//     passwordField: 'password' 
// }

// const verifyCallback = (email, password, done) => {

//     model.findOne({where: {email: email}})
//     .then((user)=>
//     {
//         if(!user)
//         {
//             console.log("jelo")
//             return done(null, false,{"full": `the user with email ${email} does not exist`})
//         }
//         const result = decrypt(password, user.password)
//         if(result)
//         {
//             console.log('shasha')
//             return done(null, user)
//         }
//         else{
//             console.log("here")
//             return done(null, false, {"full": "password incorrect"})
//         }
//     })
//     .catch(err => 
//         {
//             console.log("failed to reach any place")
//             console.log(err)
//             done(err)
//         })

// }

// (email, password, done) => {

//     model.findOne({where: {email: email}})
//     .then((user)=>
//     {
//         if(!user)
//         {
//             console.log("jelo")
//             return done(null, false,{"full": `the user with email ${email} does not exist`})
//         }
//         const result = decrypt(password, user.password)
//         if(result)
//         {
//             console.log('shasha')
//             return done(null, user)
//         }
//         else{
//             console.log("here")
//             return done(null, false, {"full": "password incorrect"})
//         }
//     })
//     .catch(err => 
//         {
//             console.log("failed to reach any place")
//             console.log(err)
//             done(err)
//         })

// }
// ))





let initLocal = ()=>{
    passport.use(new LocalStategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email,password, done) =>{
            try{
                let user = await loginService.findUserByEmail(email)
                if (user) {
                    // let compare password
                const match = await loginService.comparePassword(user, password)
                if(match == true)
                {
                    return done(null, user, null)
                }
                else
                {
                    return done(null, false, {'full': `password incorrect`})
                }

                }
                if(!user) {
                    return done(null, false, {'full': `the user with email ${email} does not exist`});
                }
            }
            catch (err)
            {
                return done(null, false, err)
            }
        }
    ))};

passport.serializeUser((user, done) =>{
    console.log("failed here to serialize")
    done(null, user.id);

  });
  
passport.deserializeUser((UserId, done) =>{
    //User.findOne({where: {id: UserId}}) 
    loginService.findUserById(id)
      .then((user)=>
      {
          console.log("failed here ")
          done(null, user)
      })
    .catch(err=> 
        {
            console.log(err)
            done(err)
        })
});


module.export = initLocal;










