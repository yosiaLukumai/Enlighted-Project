const express = require('express');
//const hbs = require("express-handlebars");


let configViewEngine = (app)=> {
    app.use(express.static("./src/public"));
    // app.engine("handlebars", hbs(
    //     {
    //         defaultLayout:'main'
    //     }
    // ))
    app.set("view engine", "ejs");
    app.set("views","./src/views");
};

module.exports = configViewEngine;
