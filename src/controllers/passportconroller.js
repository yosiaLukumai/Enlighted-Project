
const passport = require('passport')
const passportlocal = require('passport-local');
const model = require('../models/users')
const decrypt = require('../passwords/decrypt')
const LocalStategy = passportlocal.Strategy;
const loginService = require('../services/loginService')

const custom = {
    usernameField: 'email',
    passwordField: 'password' 
}

const verifyCallback = (email, password, done) => {
    console.log("shjshshshsh")
    model.findOne({where: {email: email}})
    .then((user)=>
    {
        if(!user)
        {
            console.log("jelo")
            return done(null, false,{"full": `the user with email ${email} does not exist`})
        }
        const result = decrypt(user.password, password,)
        if(result)
        {
            console.log('shasha')
            return done(null, user)
        }
        else{
            console.log("here")
            return done(null, false, {"full": "password incorrect"})
        }
    })
    .catch(err => 
        {
            console.log("failed to reach any place")
            console.log(err)
            done(err)
        })

}

const strategy = new LocalStategy(custom, verifyCallback)

passport.use(strategy)

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



// const initPassportLocal = function()
// {




//  passport.use(new LocalStategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//             //passReqToCallback: true
//         },
//         async (email,password, done) =>{
//             try{
//                 console.log("atleast=---")
//                 let user = await loginService.findUserByEmail(email)
//                 console.log(user);
//                 if (user) {
//                     // let compare password
//                 const match = await loginService.comparePassword(user, password)
//                 console.log(match)
//                 if(match == true)
//                 {
//                     return done(null, user)// null)
//                 }
//                 else
//                 {
//                     return done(null, false)// {'full': `password incorrect`})
//                 }

//                 }
//                 if(!user) {
//                     return done(null, false) //{'full': `the user with email ${email} does not exist`});
//                 }
//             }
//             catch (err)
//             {
//                 console.log("I error keep happening")
//                 return done(null, false, err)
//             }
//         }
//     ));
// }

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











