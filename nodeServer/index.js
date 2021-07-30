// const { Socket } = require('socket.io');

// node server which will handle socket io connections
const io = require('socket.io')(8000,{
    cors:
    {
        origin:'*',
    }
});
const users = {};
io.on('connection',Socket =>{
    Socket.on('new-user-joined', name =>{
        console.log("New user",name);
        users[Socket.id]=name;
        Socket.broadcast.emit('user-joined',name)
    });
    Socket.on('send',message =>{
        Socket.broadcast.emit('receive', {message: message, name: users[Socket.id]})
    });


    Socket.on('disconnet',message =>{
        Socket.broadcast.emit('left',users[Socket.id])
        delete users[socket.id];
    });
})