require('./config/config');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage("ADMIN", "Welcome to the chat"));

    socket.broadcast.emit('newMessage', generateMessage("ADMIN", "New user joined chat"));

    socket.on('createMessage', (message) => {
        console.log('create message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};