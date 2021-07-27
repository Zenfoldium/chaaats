// const { socket } = require('socket.io');

// Node server whuill will handle our Scocket.io
const PORT = process.env.PORT || 5500
console.log(PORT)

const io = require("socket.io")(PORT, {
    cors : {
        origin : "*"
    }
})

const user = {};

io.on('connection',socket=>{
    socket.on('new-user-joined', name =>{
        console.log("new user is ", name);
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message =>{
        socket.broadcast.emit('recieve',{message:message,name:user[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    })
})
