import { Server } from 'socket.io';

const io = new Server(3000, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : "*"
    }
});

io.on('connection', (socket) => {
    console.log('A user with id ' + socket.id + ' connected');
    let session = socket.handshake.query.clientSession;
    console.log('Session: ' + session);
    if (session == 'null') {
        let newSession = Date.now();
        console.log('Assigning session: ' + newSession);
        socket.emit('assignSession', newSession);
    }
});
