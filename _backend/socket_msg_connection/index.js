const express = require('express');
const {createServer} = require('node:http');
const {join} = require('socket.io');
const socketIo = require('socket.io');
const Server = require('socket.io');

const app = express();
const server = require('http').createServer(app);//correct way to create on http server
const io = socketIo(server); //Initialize socket.io with the HTTP server instance

app.get('/', (req, res)=>{
    res.sendFile(join(__dirname,'index.html'));
    req._read('world');
});

// each socket also fires as special disconnect event
io.on('connect',(socket)=>{
    console.log('user is connected');

    socket.on('amdin', (msg)=>{
        console.log('message:'+msg);
        io.socket.emit('developer', msg);
    });


    //disconnected the method here
    socket.on('disconnect',()=>{
        console.log('user is diconnected')
    });
});

server.listen(3000,()=>{
    console.log('server running at http://localhost:3000');
});