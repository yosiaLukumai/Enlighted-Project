const express = require("express")
const session = require('express-session')
const initWebRoutes = require("./routes/web")
const flash = require('connect-flash')
const passport = require('passport')
const configView = require('./configs/viewEngine')
const port = process.env.PORT || 8080;
// let setup the database

const db = require('./configs/database')

// let test if its working
const app = express()

// db.authenticate()
// .then((connection)=>
// {
//     console.log('db connected')
// })
// .catch(err => console.log("failed to connect"))

// sessions and view engine
configView(app)

// let craete models 
const User = require('./Models/User')

// let sync our model
// User.sync({force: true})
// .then(yeah => console.log("model synced"))
// .catch(err => console.log(err.message))

app.use(session(
    {
        secret:'YelTec',
        resave: true,
        saveUninitialized: false,
        cookie:{maxAge:1000*60*60*24}
    }))
// parsing incoming body requests
app.use(express.urlencoded({  extended: false}))
app.use(express.json())

app.use(flash())

// let set passport 
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.errormsg = req.flash('error')
    next()
})
initWebRoutes(app)


app.listen(port, ()=>
{
    console.log("app running on port 8080")
})









