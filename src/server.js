import { Server } from 'socket.io';
import Room from './room_manager.js'; // Assuming you have a Room class defined in a file called room.js

const io = new Server(3000, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : "*"
    }
});

const rooms = new Map();

io.on('connection', (socket) => {
    console.log('A user with id ' + socket.id + ' connected');
    let session = socket.handshake.query.clientSession;
    console.log('Session: ' + session);

    // If session is null, assign a new session
    if (session == 'null') {
        let newSession = Date.now();
        console.log('Assigning session: ' + newSession);
        socket.emit('assignSession', newSession);
        return; 
    }

    // Handle joining room
    socket.on('joinRoom', (roomId) => {
        let room = rooms.get(roomId);

        if (!room) {
            console.log("Creating new room with id:", roomId);
            room = new Room(roomId, 4, gameStateManager, socket); 
            rooms.set(roomId, room);
        }

        room.joinRoom(socket, session);
    });

    // Handle player joining
    socket.on('joinPlayer', (roomId) => {
        let room = rooms.get(roomId);

        if (room) {
            room.joinPlayer(session);
        }
    });

    // Handle player ready state
    socket.on('ready', (roomId) => {
        let room = rooms.get(roomId);

        if (room) {
            room.playerReady(session);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User with id ' + socket.id + ' disconnected');
    });
});
