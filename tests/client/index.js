import { io } from 'socket.io-client';


const socket = io('http://localhost:3000', {
    query: {
        clientSession: sessionStorage.getItem("client-token")
    }
});

socket.on('assignSession', (newSession) => {
    sessionStorage.setItem("client-token", newSession);
    console.log('Assigned session: ' + newSession);
});

socket.emit('joinRoom', 'test-room');