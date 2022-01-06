const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require("../Models/User")
const bycrypt = require('bcryptjs')


function initPassport()
{


passport.use(new LocalStrategy(
    {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    (req, username, password, done)=>
    {
        
        User.findOne({where:{username:username}})
        .then((user)=>
        {
            console.log(user)
            if(!user)
            {
                // he she was not registred
                return done(null, false, req.flash('errors',"incorrect username"))
            }
            // if there is user then we have to compare password
            bycrypt.compare(password, user.password)
            .then(match =>
                {
                    if(match == false)
                    {
                        console.log('NOT--matched', match)
                        return done(null, false, req.flash('errors', "password Incorrect"))
                    }
                    if(match == true)
                    {
                        console.log('matched', match)
                        return done(null, user)
                    }
                })
            .catch(err =>
                {
                    console.log(err.message)
                    return done(err)
                })
        })
        .catch(err =>
            {
                return done(err)
            })
        // serializing and deserializing the user
        
        
    }))
}
passport.serializeUser((user, done)=>
        {
            return done(null, user.id)
        })



passport.deserializeUser((id, done)=>
        {
            User.findByPk(id)
            .then(user =>
                {
                    return done(null, user)
                })
            .catch(err =>
                {
                    return done(err)
                })
        })
    



module.exports = initPassport;