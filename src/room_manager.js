import { Mutex } from 'async-mutex';

class Room {
    roomID;

    gameStateManager;
    gameState;
    gameStateMutex;

    gameIsActive = false;

    // Maps Client ID to Socket
    connectedClients = new Map();

    players = [];
    numPlayers;
    maxPlayers;
    numPlayers = 0;
    readyPlayers = 0;
    
    socket;

    Room(id, maxPlayers, gameStateManager, socket) {
        // don't forget to handle when these arguments aren't provided!
        // Error without crashing application, make an invalid room that obviously won't work + console log
        this.roomID = id;
        this.gameStateManager = gameStateManager;
        this.socket = socket;
        // max players
        // fill list with null values for players
        for (let i = 0; i < maxPlayers; i++) {
            this.players.push(null);
        }
    }
    joinRoom(client, socket, sessionID) {
        this.connectedClients.set(sessionID, socket);
        const playersIndex = this.players.length;
        if (playersIndex < 4) {
            this.players.push(null);
        }
        socket.leaveFromCurrentRoom = (() => {
            this.connectedClients.delete(sessionID);
        }).bind(this);
        client.socket.on('disconnect', client.leaveFromCurrentRoom);
        client.socket.once('leaveRoom', client.leaveFromCurrentRoom);
        
    }
    joinPlayer(sessionID) {
        // don't forget to handle when these arguments aren't provided!
        
        const i = players.findIndex((p) => p == null);

        // Will do nothing if there are no spots left
        if (i == -1) return;
        this.players[i] = { sessionID, ready: false };

        this.setPlayerHooks(sessionID);
    }

    setPlayerHooks(sessionID) {
        const client = this.connectedClients.get(sessionID);

        const leaveRoom = (() => {
            this.connectedClients.delete(sessionID);
            if (this.gameIsActive) return;
            this.players[i] = null;
            this.numPlayers--;
        }).bind(this);
        client.leaveAsClient = leaveRoom;

        const readyFunc = (() => {
            if (this.players[i].ready) return;
            this.players[i].ready = true;
            this.readyPlayers++;
            if (this.readyPlayers == this.maxPlayers)
                this.startGame();
        }).bind(this);
        client.socket.on('ready', readyFunc);
    }

    startGame() {
        this.gameIsActive = true;
        this.gameStateMutex = new Mutex();
        this.gameState = this.gameStateManager.createDefaultGameState();

        socket.to(this.roomID).emit('startGame', this.gameState);
    }

    setGameHooks(sessionID, playerIndex) {
    }

    reconnect(sessionID) {
        // On reconnect, add the appropriate hooks back (this only applies when a game is in progress)
        if (!this.gameState.inProgress) return;
        const i = this.players.findIndex();
    }

    createActionHandler() {
        // Create a hook specific to a player to be bound to their socket that handles incoming Actions
    }
}
