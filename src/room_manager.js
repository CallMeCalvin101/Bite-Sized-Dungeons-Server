import { Mutex } from 'async-mutex';
import Action from './models/action.js';
import gameStateManager from './game_state_manager.js';

export default class Room {
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

    constructor(id, maxPlayers, gameStateManager, socket) {
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

    joinRoom(client, sessionID) {
        client.join(this.roomID);
        this.connectedClients.set(sessionID, client);
        this.setClientHooks(sessionID);
        socket.to(this.roomID).emit('clientJoined', sessionID);
    }

    setClientHooks(sessionID) {
        const client = this.connectedClients.get(sessionID);

        client.leaveFromCurrentRoom = (() => {
            this.connectedClients.delete(sessionID);
        }).bind(this);
        client.on('disconnect', client.leaveFromCurrentRoom);
        client.once('leaveRoom', client.leaveFromCurrentRoom);
    }

    joinPlayer(sessionID) {
        // don't forget to handle when these arguments aren't provided!
        
        const i = players.findIndex((p) => p == null);

        // Will do nothing if there are no spots left
        if (i == -1) return;
        this.players[i] = { sessionID, ready: false };

        this.setPlayerHooks(sessionID);

        // Let clients know somebody joined
        this.socket.to(this.roomID).emit('playerJoined', i, sessionID);
    }

    setPlayerHooks(sessionID) {
        const client = this.connectedClients.get(sessionID);

        client.leaveFromCurrentRoom = (() => {
            this.connectedClients.delete(sessionID);
            if (this.gameIsActive) return;
            this.players[i] = null;
            this.numPlayers--;
        }).bind(this);
        client.off('leaveRoom', client.leaveFromCurrentRoom);

        const readyFunc = (() => {
            if (this.players[i].ready) return;
            this.players[i].ready = true;
            this.readyPlayers++;
            if (this.readyPlayers == this.maxPlayers)
                this.startGame();
        }).bind(this);
        client.on('ready', readyFunc);
    }

    startGame() {
        this.gameIsActive = true;
        this.gameStateMutex = new Mutex();
        this.gameState = this.gameStateManager.createDefaultGameState();

        for (let i in this.players)
            this.setGameHooks(this.players[i].sessionID, i);

        socket.to(this.roomID).emit('startGame', this.gameState);
    }

    setGameHooks(sessionID, playerIndex) {
        const client = this.connectedClients.get(sessionID);
        client.on('action', (async (/* what the client emits to us */) => {
            let action = await this.gameStateMutex.runExclusive(async () => {
                // Can you make it update the action here?
                // this.gameStateManager.processAction(something);
                // Return whatever needs to be sent to clients
            });
            // Then emit it like this
            this.socket.to(this.roomID).emit('action', action);
        }).bind(this));
    }

    reconnect(client, sessionID) {
        // On reconnect, add the appropriate hooks back (this only applies when a game is in progress)
        if (!this.gameState.inProgress) return;
        const i = this.players.findIndex((p) => p.sessionID == sessionID);
        if (i == -1) return;
        this.players[i].socket = client;
        this.setClientHooks(sessionID);
        this.setPlayerHooks(sessionID);
        this.setGameHooks(sessionID);
    }
}
