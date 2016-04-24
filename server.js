#!/bin/env node

'use strict';
var iplocal = '10.128.1.160';
var portlocal = '3300';
var apiUrl = '/api';
// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
// serve the files out of ./public as our main files
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 3600 * 24 //过期时间
    }
}));

app.use(express.static(__dirname + '/dist'));

app.get('/',function (req,res) {
    res.sendFile(path.resolve('dist/index.html'));
});


// start server on the specified port and binding host
app.listen(portlocal, iplocal, function() {
    // print a message when the server starts listening
    console.log('server starting on mad.wiki');
});