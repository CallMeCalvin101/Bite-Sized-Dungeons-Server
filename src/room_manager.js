import { Mutex } from 'async-mutex';

class Room {
    roomID;

    gameStateManager;
    gameState;
    gameStateMutex;

    gameIsActive;

    // Maps Client ID to Socket
    connectedClients = new Map();
    clientsMutex;

    players = [];
    readyPlayers = 0;

    Room(id, maxPlayers, gameStateManager) {
        // don't forget to handle when these arguments aren't provided!
        // GameState and mutex will be initialized in ready()
        // Error without crashing application, make an invalid room that obviously won't work + console log
        this.roomID = id;
        this.gameStateManager = gameStateManager;
        this.clientsMutex = new Mutex();
        this.gameIsActive = false;
        // max players
        // fill list with null values for players
        for (let i = 0; i < maxPlayers; i++) {
            this.players.push(null);
        }
    }
    addClient(socket, sessionID, client) {
        this.connectedClients.set(sessionID, socket);
        const playersIndex = this.players.length;
        if (playersIndex < 4) {
            this.players.push(null);
        }
        client.socket.on('disconnect', () => {
            this.clientsMutex.release();
            this.connectedClients.delete(sessionID);
        })
        client.socket.once('leaveRoom',() => {
            if (!this.gameIsActive) {
                this.players[playersIndex] = null;
            }
        })
        
    }
    joinRoom(socket, sessionID) {
        // don't forget to handle when these arguments aren't provided!
        // Just add to connectedClients and bind appropriate socket handlers
        this.clientsMutex.
        this.connectedClients.push({ socket, sessionID });
    }
    // client is a { socket, sessionID } object, see joinRoom()
    joinPlayer(client) {
        // don't forget to handle when these arguments aren't provided!
        
        const i = players.findIndex((p) => p == null);
        // Will do nothing if there are no spots left
        if (i == -1) return;

        this.players[i] = { ...client, ready: false };
        const readyFunc = () => {
            if (this.players[i].ready) return;
            this.players[i].ready = true;
            this.readyPlayers++;  
            if (this.readyPlayers < players.length) return;
            if (this.readyPlayers > players.length)
                console.log("Warning: room " + roomID + "has too many ready players?");
            this.ready();
        };
        readyFunc.bind(this);
        client.socket.on('ready', readyFunc);
        // will not do anything if 
    }
    leaveRoom(sessionID) {
        // don't forget to handle when these arguments aren't provided!
        // Delete this room if the last person left, maybe call a function provided by constructor?
        const i = players.findIndex((p) => p.sessionID == sessionID);

    }
    ready(player) {
        // Start the game. Call this when all players are ready
        // At this point, connected clients in the room who aren't a player should know they are spectators
        // We will set up action listeners ONLY for player clients
        for (let player in this.players) {
            players.socket 
        }
        // Also set up loop for AIActions
    }
    reconnect() {
        // On reconnect, add the appropriate hooks back (this only applies when a game is in progress)
        if (this.gameState.inProgress) {
            // do stuff
        }
    }
    createActionHandler() {
        // Create a hook specific to a player to be bound to their socket that handles incoming Actions
    }
}
