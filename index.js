/*
* expressjs-> spring
* mongoose
* nodemon
* dotenv
* */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser= require('body-parser');


const serverPort = process.env.SERVER_PORT;

// =========================================
const CustomerRoute = require('./routes/CustomerRoute');
// =========================================

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/TestApp');

app.listen(serverPort,()=>{
    console.log(`server up & Running on port ${serverPort}`)
})

app.get('/test',(req,res)=>{
    return res.json('server works');
})

app.use('/api/v1/customers',CustomerRoute);