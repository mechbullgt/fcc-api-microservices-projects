"use strict";
require('dotenv').config();

var express = require('express');
var app = express();

// CORS so that fcc can handle the tests.
var cors = require('cors');
app.use(cors({
    optionsSuccessStatus:200
}));

app.use(express.static('public'));

app.get('/',(req,res)=>{
    console.log('req :', req['route']);
    res.sendFile(__dirname+"/views/index.html");
})


var listener = app.listen(process.env.PORT,()=>{
    console.log('process.env.PORT :', process.env.PORT);
    console.log("App is listening at: ",process.env.PORT);
})