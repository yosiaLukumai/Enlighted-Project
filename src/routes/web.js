const express = require('express');
const controller = require('../controllers/homePageController')
const passport = require('passport')
const logincontroller = require('../controllers/login')
const initPassportLocal = require('../controllers/pass')
const dashboard = require("../controllers/dash")

let router = express.Router();
initPassportLocal()

let initWebRoutes = (app) => {
    router.get("/",logincontroller.checkLoggedOut, controller.homepage);
    router.get("/login",logincontroller.checkLoggedOut,controller.login)
    router.get("/register",logincontroller.checkLoggedOut, controller.register)
    router.post("/register", controller.createUser)
    router.get("/dash", logincontroller.checkLoggedIn,dashboard.dashboard)
    router.post("/logina",passport.authenticate('local',{
    failureRedirect: '/login',
    successRedirect: '/dash', 
    successFlash:true,
    failureFlash: true
    }))
    router.post('/logout', logincontroller.postLogOut)
   
    return app.use("/", router);
};



module.exports = initWebRoutes;
