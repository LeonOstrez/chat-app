require('./config/config');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'Mike',
        text: "whatsup",
        createdAt: 123
    });

    socket.on('createMessage', (msg) => {
        console.log('create message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });
});


server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};