const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io');


app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, function(){
    console.log("Node app start at port 9093");
})