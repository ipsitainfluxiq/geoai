var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json({parameterlimit:10000,limit:'90mb'}));
app.use(bodyParser.urlencoded({parameterlimit:10000,limit:'90mb',extended:false }));

var request = require('request');
var cheerio = require('cheerio');

var EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
emitter.setMaxListeners(0);
/*----------------------------------------------------------------------------------------------------*/
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});