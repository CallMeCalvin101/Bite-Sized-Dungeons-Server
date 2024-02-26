import { Server } from 'socket.io';

const io = new Server(3000, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ["*"]
    }
});

io.on('connection', (socket) => {
    console.log('A user with id ' + socket.id + ' connected');
});
