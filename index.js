const path = require('path');
const express = require('express');
const SocketIO = require('socket.io');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// statics files
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// websockets
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection.', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
        console.log(data);
    });

    socket.on('chat:typing', (username) => {
        socket.broadcast.emit('chat:typing', username);
        console.log(username);
    });
});

