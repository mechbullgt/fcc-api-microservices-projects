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
});

app.get('/api/hello',(req,res)=>{
    res.json({
        greeting:"Hi! I'm api/hello"
    });
});

app.get('/api/timestamp/:date_string',(req,res)=>{
    let urlString = req.params;
    let dateTimeString = urlString['date_string'];
    console.log('dateTimeString :', dateTimeString);
    //verify the date, ifValid or in ISO or in unix
    let dateValid = isValid(dateTimeString);
    let resObj;
    //if not valid return new Date().now and use the calculations
    switch (dateValid){
        case 0:
        resObj= responseForInvalidDate();
        break;
        case 1:
        resObj= responseForISOdateFormat(dateTimeString);
        break;
        case 2:
        resObj=responseForUNIXdateFormat(dateTimeString);
        break;
        default:
        console.log("Something went wrong");
    }
    //if in UNIX *1000 and return values
    //if in ISO just return the values
    res.json(resObj);
});

function isValid(dateTimeString){
    let dateArr = dateTimeString.split('');
    let isoCheck = dateArr.includes('-');
    let alphaCheck = dateTimeString.match(/[a-zA-Z]/g);
    console.log('alphaCheck :', alphaCheck);
    if(alphaCheck){
        return 0;
    } else if(!isoCheck){
        return 2;
    } else if(!isNaN(Date.parse(dateTimeString))){
        return 1;
    }
};

function responseForInvalidDate(){
    console.log("Invalid date");
    let date = Date.now();
    console.log('date :', date);
    return responseForUNIXdateFormat(date);
}

function responseForISOdateFormat(dateString){
    let dateParsed = dateString.toString();
    let returnObj =  {
        unix:(new Date(dateParsed).getTime()),
        utc:(new Date(dateParsed).toUTCString())
    };
    return returnObj;
}

function responseForUNIXdateFormat(dateString){
    console.log("UNIX date");
    let dateParsed = parseInt(dateString);
    console.log('dateParsed :', dateParsed);
    let returnObj =  {
        unix:(new Date(dateParsed).getTime()),
        utc:(new Date(dateParsed).toUTCString())
    };
    return returnObj;
};

var listener = app.listen(process.env.PORT,()=>{
    console.log('process.env.PORT :', process.env.PORT);
    console.log("App is listening at: ",process.env.PORT);
})