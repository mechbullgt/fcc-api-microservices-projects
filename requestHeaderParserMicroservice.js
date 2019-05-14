require('dotenv').config();

var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({
    optionsSuccessStatus:200
}));

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
});

app.get("/api/hello",(req, res)=>{
    res.send("Hi there!, I'm the hello API!");
});

app.get("/api/whoami",(req,res)=>{
    // console.log(req['headers']);
    let userAgent = req['headers']['user-agent'];
    let lang = req['headers']['accept-language'];
    let ipAddress = req.ip;
    res.json({
        "ipaddress":ipAddress,
        "language":lang,
        "software":userAgent
    })
})

let livePORT = process.env.PORT;
var listener = app.listen(livePORT,()=>{
    console.log("App is live on :", livePORT);
})
